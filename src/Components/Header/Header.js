import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import './Header.css'

const componentName = () => {
  return (
    <div className="User">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/manage">Manage Inventory</Link>
      </nav>
    </div>
  )
}

export default componentName
