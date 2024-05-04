import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.top;
    const AddHandler=props.AddHandler;
    return (
        <div style={{width:'70%',borderBottom:'1px solid gray',padding:'7px',marginLeft:'200px',borderRight:'1px solid gray'}}>
            <h3>{name}</h3>
            <h4>Quantity: {quantity}</h4>
            <h4><small>Price is: {price}</small></h4>
            <br />
            <button onClick={()=>AddHandler(key)} className="btn">Remove</button>
        </div>
    );
};

export default ReviewItem;