import React from "react";

const Cart = (props) => {
  const cart = props.cart;

  // const totalPrice = cart.reduce((total, pd) => total +Number( (pd.price*pd.quantity)), 0)
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].price,cart[i].quantity)
    const product=cart[i];
    totalPrice =((totalPrice+ product.price * product.quantity) || 1);
  }
  let shipping = 0;
  if (totalPrice > 35) {
    shipping = 0;
  } else if (totalPrice > 15) {
    shipping = 4.99;
  } else if (totalPrice > 0) {
    shipping = 12.99;
  }

  const Tax = totalPrice / 10;
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  const FinalTotal = totalPrice + shipping + Tax;
  return (
    <div>
      <h1 style={{ color: "blue" }}>This is Cart!</h1>
      <h2>Cart item is: {cart.length}</h2>
      <h2>Product price is : {formatNumber(totalPrice)}</h2>
      <h3>Shipping cost is: {shipping}</h3>
      <h3>Tax + Vat: {formatNumber(Tax)}</h3>
      <h4>Total price is: {formatNumber(FinalTotal)}</h4>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
