import { useState, useEffect } from "react";
import { Product, Ingredient } from "../../data-providers/Server";
import "./NewSaladIngredientStyle.css";

interface NewSaladIngredientProps {
  product: Product;
  resetTrigger: number;
  onIngredientChange: (updatedIngredient: Ingredient) => void;
}

const NewSaladIngredient = ({ product, resetTrigger, onIngredientChange }: NewSaladIngredientProps) => {
  const [ingredient, setIngredient] = useState<Ingredient>({
    product_id: product.id,
    quantity: 0,
  });

  useEffect(() => {
    setIngredient({ product_id: product.id, quantity: 0 }); 
  }, [resetTrigger, product.id]);

  const handleIncrement = () => {
    const updatedIngredient = { ...ingredient, quantity: ingredient.quantity + 1 };
    setIngredient(updatedIngredient);
    onIngredientChange(updatedIngredient);
  };

  const handleDecrement = () => {
    if (ingredient.quantity > 1) {
      const updatedIngredient = { ...ingredient, quantity: ingredient.quantity - 1 };
      setIngredient(updatedIngredient);
      onIngredientChange(updatedIngredient);
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    const updatedIngredient = { ...ingredient, quantity: 0 };
    setIngredient(updatedIngredient);
    onIngredientChange(updatedIngredient);
  };

  const toggleSelection = () => {
    if (ingredient.quantity === 0) {
      const updatedIngredient = { ...ingredient, quantity: 1 };
      setIngredient(updatedIngredient);
      onIngredientChange(updatedIngredient);
    } 
  };

  return (
    <div>
      <div
        onClick={toggleSelection}
        className={`ingredient ${ingredient.quantity > 0 ? "selected" : ""}`}
      >
        <div>{product.title}</div>
        {ingredient.quantity > 0 && (
        <div className="quantity-container">
          <button className='quantity-btn' onClick={handleIncrement}>+</button>
          <span>{ingredient.quantity}</span>
          <button className='quantity-btn' onClick={handleDecrement}>-</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default NewSaladIngredient;
