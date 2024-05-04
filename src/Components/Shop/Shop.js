import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  
  const [userName, setuserName] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/readProduct`)
      .then((res) => res.json())
      .then((data) => {
        setuserName(data);
      });
  }, []);

  useEffect(() => {
    const findKey = getDatabaseCart();
    const getArrayKey = Object.keys(findKey);
    console.log(userName, getArrayKey);

    fetch(`http://localhost:5000/singlePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getArrayKey),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  const addHandle = (props) => {
    const AddProduct = props.key;
    const findKey = cart.find((pd) => pd.key === AddProduct);

    let count = 1;
    let newCart;
    if (findKey) {
      count = findKey.quantity + 1;
      findKey.quantity = count;
      const others = cart.filter((top) => top.key !== AddProduct);
      newCart = [...others, findKey];
    } else {
      props.quantity = 1;
      newCart = [...cart, props];
    }
    setCart(newCart);
    addToDatabaseCart(props.key, count);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {userName.map((user) => (
          <Product
            key={user.key}
            addToCart={true}
            addHandle={addHandle}
            product={user}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
