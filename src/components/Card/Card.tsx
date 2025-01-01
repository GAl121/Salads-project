import { IoExtensionPuzzle } from "react-icons/io5";
import { Product } from "../../data-providers/Server";

import "./CardStyle.css";
import { useCallback } from "react";
 
interface CardProps {
  product: Product;
  isSalad: boolean;
  toggleStock: (productId: number) => void;
  ingredients: string[];
}

const Card = ({ product, isSalad, toggleStock, ingredients }: CardProps) => {
  const handleStockToggle = useCallback(() => {
    toggleStock(product.id);
  }, [product.id, toggleStock]);

  return (
    <div
      className={`product-card ${
        product.in_stock ? "in-stock" : "out-of-stock"
      }`}
    >
      <h1>
        {product.title}
        {isSalad && (
          <IoExtensionPuzzle
            style={{ marginLeft: 10 }}
            color="green"
            size={25}
          />
        )}
      </h1>

      {isSalad && ingredients.length > 0 && (
        <div className="ingredients">
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="stock-toggle" onClick={handleStockToggle}>
        Toggle in stock
      </button>
    </div>
  );
};

export default Card;
