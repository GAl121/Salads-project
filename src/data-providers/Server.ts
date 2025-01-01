import { products } from "../mock-data/products"
import { questions } from "../mock-data/questions";

let UNIQUE_ID : number = products[products.length -1].id +1;

const getDeepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

//feel free to add funcitons

export interface Ingredient {
    product_id: number;
    quantity: number
}
export interface Product {
    id: number;
    title: string;
    in_stock: boolean;
    ingredients: Ingredient[]
}

export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const getAllProducts = async (): Promise<Product[]> => {
    //DO NOT EDIT THIS FUNCTION
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(products));
        }, 1000);
    })
}

const getProductById = async (id: number): Promise<Product | undefined> => {
    // DO NOT EDIT THIS FUNCTION
    const product = products.find(product => product.id === id);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(product));
        }, 1000);
    })
}

const createSalad = async (title:string, ingredients: Ingredient[])=> {
    const selectedProducts = products.filter((prod) => ingredients.find(ing => ing.product_id === prod.id));
    const chekInStock = selectedProducts.every((prod) => prod.in_stock);
    const newSalad: Product = {
        id: UNIQUE_ID++,
        title,
        in_stock: chekInStock,
        ingredients
    };
    products.push(newSalad);
    return newSalad;
}

 const createProduct = async (name: string) => {
    const newIngredient: Product = {
        id: UNIQUE_ID++,
        title: name,
        in_stock: true,
        ingredients: [],
    } 
    products.push(newIngredient);
    
 }

export const toggleProductInStock = async (productId: number): Promise<Product[]> => {
    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");

    product.in_stock = !product.in_stock;

    if (!product.in_stock) {
        // Update related salads to be out of stock
        products.forEach((p) => {
            if (p.ingredients.some((ingredient) => ingredient.product_id === productId)) {
                p.in_stock = false;
            }
        });
    } else {
        // Restore salads if all their ingredients are in stock
        products.forEach((p) => {
            if (
                p.ingredients.length > 0 &&
                p.ingredients.every((ingredient) =>
                    products.find((prod) => prod.id === ingredient.product_id)?.in_stock
                )
            ) {
                p.in_stock = true;
            }
        });
    }

    return getDeepCopy(products);
};


const getQuestions = async (): Promise<Question[]> => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(questions);
        }, 1000);
    })
}

export const DB = {
    getAllProducts,
    getProductById,
    getQuestions,
    toggleProductInStock,
    createSalad,
    createProduct
}

