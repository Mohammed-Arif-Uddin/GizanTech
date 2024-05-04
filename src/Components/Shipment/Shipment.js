import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { clearLocalShoppingCart, getDatabaseCart } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const success=()=>{
      
  }
  const onSubmit = (data) => {
    const findKey = getDatabaseCart();
    const orderDetail = {
      ...loggedInUser,
      product: findKey,
      shipment: data,
      orderDate: new Date(),
    };
    fetch(`http://localhost:5000/orderProducts`,{
        method: 'POST',
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify(orderDetail)
    })
    .then(res=>res.json())
    .then(data=>{
        clearLocalShoppingCart();
        alert("Order Successfully!!!")
    })
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="shipment" onSubmit={handleSubmit(onSubmit)}>
      {/* <input defaultValue="test" {...register("example")} /> */}
      <input
        {...register("name", { required: true })}
        placeholder="Your name"
      />
      {errors.name && <span className="error">The name is required</span>}

      <input
        {...register("email", { required: true })}
        placeholder="Your email"
      />
      {errors.email && <span className="error">The email is required</span>}

      <input
        {...register("address", { required: true })}
        placeholder="Your Address"
      />
      {errors.address && <span className="error">The address is required</span>}

      <input
        {...register("phone", { required: true })}
        placeholder="Your phone number"
      />
      {errors.phone && <span className="error">The phone is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
