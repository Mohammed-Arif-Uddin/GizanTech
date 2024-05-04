import React from "react";

const Inventory = () => {
  const item = () => {
    const product = {};
    fetch(`http://localhost:5000/addProducts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };
  return (
    <div>
      
      <form action="">
        <p><span>Name: </span><input type="text"></input></p>
        <p><span>Price: </span><input type="text"></input></p>
        <p><span>Quantity: </span><input type="text"></input></p>
        <p><span>Add Image</span><input type="file"></input></p>
        <button onClick={item}>Add Item</button>
      </form>
    </div>
  );
};

export default Inventory;
