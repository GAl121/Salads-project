import { useState } from "react";
import { DB } from "../data-providers/Server";
import "./CreateNewIngredientStyle.css";
import { Modal } from "../components";

const CreateNewIngredient = () => {
  const [ingredient, setIngredient] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = () => {
    DB.createProduct(ingredient);
    setShowModal(true);
  };

  const resetIngredient = () => {
    setIngredient("");
    setShowModal(false);
  };

  if (showModal) {
    return (
      <Modal open={showModal}>
        <div className="modal-container">
          <h3>The Ingredient {ingredient}</h3>
          <p>was successfully added!</p>
          <button onClick={resetIngredient}> Ok</button>
        </div>
      </Modal>
    );
  }

  return (
    <div className="newIngedient-container">
      <h2>Create New Ingredient</h2>
      <input
        type="text"
        placeholder="Ingredient name"
        onChange={(e) => {
          setIngredient(e.target.value);
        }}
      />
      <button onClick={handleSubmit} disabled={ingredient === ""}>
        Submit
      </button>
    </div>
  );
};

export default CreateNewIngredient;
