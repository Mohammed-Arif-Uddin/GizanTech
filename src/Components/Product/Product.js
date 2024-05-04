import React from 'react'
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const { name, img, seller, price, stock,key } = props.product
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-name">
        <h3 className="name"><Link to={"/product/"+key}>{name}</Link></h3>
        <br />
        <h4>by: {seller}</h4>
        <p>${price}</p>

        <p>
          <small>Only {stock} left in stock- Order soon</small>
        </p>
        {props.addToCart && <button onClick={() =>props.addHandle(props.product)}className="btn">
          <FontAwesomeIcon icon={faShoppingCart} />
            add to cart
        </button>}
      </div>
    </div>
  )
}

export default Product
