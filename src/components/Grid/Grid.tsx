import { Product } from "../../data-providers/Server";
import Card from "../Card";
import "./GridStyle.css";

interface GridProps {
  products: Product[];
  selectedProducts: Product[];
  toggleStock: (productId: number) => void;
}

const Grid = ({ products, selectedProducts, toggleStock }: GridProps) => {
  return (
    <div className="grid-container">
      {selectedProducts.length === 0 ? (
        <p>Empty list</p>
      ) : (
        selectedProducts.map((product) => {
          const isSalad = product.ingredients.length > 0;
          const ingredients = product.ingredients.map((ingredient) => {
            const ingredientTitle = products.find(
              (prod) => prod.id === ingredient.product_id
            )?.title;
            return `${ingredient.quantity}x - ${ingredientTitle}`;
          });

          return (
            <Card
              key={product.id}
              product={product}
              isSalad={isSalad}
              toggleStock={toggleStock}
              ingredients={ingredients}
            />
          );
        })
      )}
    </div>
  );
};

export default Grid;
