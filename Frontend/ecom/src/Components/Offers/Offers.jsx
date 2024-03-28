import React from 'react'
import './Offers.css'
import exc_img from '../Assests/exclusive_image.png'
const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive! </h1>
            <h1>Offers for you</h1>
            <p>Only On Best Seller Products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exc_img} alt="" />
        </div>
    </div>
  )
}

export default Offers