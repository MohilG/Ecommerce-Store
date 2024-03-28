import React from 'react'
import './Breadcrum.css'
import arrow from '../Assests/breadcrum_arrow.png'
const Breadcrum = (props) => {
    const {product}=props
  return (
    <div className='breadcrum'>
        Home <img src={arrow} alt="" /> Shop <img src={arrow} alt="" /> {product.category} <img src={arrow} alt="" /> {product.name} 
    </div>
  )
}

export default Breadcrum