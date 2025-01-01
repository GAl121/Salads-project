import React, { useEffect, useState } from "react";
import { DB, Ingredient, Product } from "../data-providers/Server";
import { Loader, Modal, NewSaladIngredient } from "../components";
import "./CreateNewSaladStyle.css";

const CreateNewSalad: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  useEffect(() => {
    DB.getAllProducts()
      .then((products: Product[]) => {
        const emptyIngredientsProducts = products.filter(
          (product) => product.ingredients.length === 0
        );
        setProducts(emptyIngredientsProducts);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleIngredientChange = (updatedIngredient: Ingredient) => {
    setSelectedIngredients((perv) => {
      const existingIngredientindex = perv.findIndex(
        (p) => p.product_id === updatedIngredient.product_id
      );
      if (existingIngredientindex >= 0) {
        const updatedProducts = [...perv];
        updatedProducts[existingIngredientindex] = updatedIngredient;
        return updatedProducts.filter((prod) => prod.quantity > 0);
      }
      return [...perv, updatedIngredient];
    });
  };

  const handleSubmit = () => {
    if (inputValue && selectedIngredients.length > 0) {
      DB.createSalad(inputValue, selectedIngredients);
      setShowModal(true);
    }
  };

  const resetSalad = () => {
    setShowModal(false);
    setSelectedIngredients([]);
    setInputValue("");
    setResetTrigger((perv) => perv + 1);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (showModal) {
    return (
      <Modal open={showModal}>
        <div className="modal-container">
          <h3>The Salad {inputValue}</h3>
          <p>was successfully added!</p>
          <button onClick={resetSalad}> Ok</button>
        </div>
      </Modal>
    );
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <h2 className="title">Create new salad</h2>
        <div className="grid">
          {products.map((product) => (
            <NewSaladIngredient
              product={product}
              key={product.id}
              resetTrigger={resetTrigger}
              onIngredientChange={handleIngredientChange}
            />
          ))}
        </div>
        <div className="submit-container">
          <input
            type="text"
            placeholder="Enter salad name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input"
          />
          <button
            className="submitButton"
            onClick={handleSubmit}
            disabled={selectedIngredients.length === 0 || inputValue === ""}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewSalad;
