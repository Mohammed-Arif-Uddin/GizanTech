import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import {
  clearLocalShoppingCart,
  getDatabaseCart,
  removeFromDatabaseCart,
} from '../../utilities/databaseManager'
import Cart from '../Cart/Cart'
import ReviewItem from '../ReviewItem/ReviewItem'

const Review = () => {
  const [item, setItem] = useState([])

  const AddHandler = (product) => {
    const newItem = item.filter((pd) => pd.key !== product)
    setItem(newItem)
    removeFromDatabaseCart(product)
  }


  const history=useHistory();
  const addProceedCheck = () => {
     history.push('/shipment')
  }

  useEffect(() => {
    const findKey = getDatabaseCart()
    const productKey = Object.keys(findKey)
    fetch(`http://localhost:5000/singlePost`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(productKey)
    })
    .then(res=>res.json())
    .then(data=>{
      setItem(data);
    })
    
  }, [])
  return (
    <div className="shop-container">
      <div className="item-type">
        {item.map((pd) => (
          <ReviewItem
            AddHandler={AddHandler}
            key={pd.key}
            top={pd}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-type">
        <Cart cart={item}>
          <button onClick={addProceedCheck} className="btn">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  )
}

export default Review
