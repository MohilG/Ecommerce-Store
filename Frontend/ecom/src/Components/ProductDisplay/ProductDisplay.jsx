import React,{ useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assests/star_icon.png'
import star_dull_icon from '../Assests/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product}=props
    const {addToCart}=useContext(ShopContext)
  return (
    <div className='productdisplay'>
        <div className="left">
        <div className="img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="img">
        <img className='main-img' src={product.image} alt="" />
        </div>
        </div>
        <div className="right">
        <h1>{product.name}</h1>
        <div className="right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>122</p>
        </div>
        <div className="right-prices">
            <div className="old-price">${product.old_price}</div>
            <div className="new-price">${product.new_price}</div>
            <div className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis ut vero officiis nemo quaerat quia culpa laudantium voluptas hic corrupti, laboriosam sequi similique id velit libero ullam aliquam consequatur placeat!</div>
            <div className="right-size">
                <h1>Select Size</h1>
                <div className="sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button className='cart-btn' onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className="category"><span>Category :</span>Women,T-shirt,Crop Top</p>
            <p className="category"><span>Tags :</span>Modern,Latest</p>

        </div>

        </div>
    </div>
  )
}

export default ProductDisplay