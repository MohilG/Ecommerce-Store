import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assests/cart_cross_icon.png'
const CartItem = () => {
    const {all_product,cartItem,removeFromCart,getTotal}=useContext(ShopContext)
  return (
    <div className='cartitems'>
        <div className="cart-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p></div>
            <hr />
            {all_product.map((e)=>{
                if(cartItem[e.id]>0){
                  return  <div>
                         <div className="cartitem-format cart-main">
                    <img src={e.image} alt="" className="product-icon" />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className="cartitem-quantity">{cartItem[e.id]}</button>
                    <p>${e.new_price*cartItem[e.id]}</p>
                    <img className='remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
                }
                return null
            })}
            <div className="down">
                <div className="cartitem-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="tot-item">
                            <p>SubTotal</p>
                            <p>${getTotal()}</p>
                        </div>
                        <hr />
                        <div className="tot-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="tot-item">
                            <h3>Total</h3>
                            <h3>${getTotal()}</h3>
                        </div>
                    </div>
                    <div>
                        <div className="promocode">
                            <p>If you have a promo code ,Enter it here</p>
                            <div className="promobox">
                                <input type="text" placeholder='Promo Code' />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                    <button>Proceed to Checkout</button>

                </div>
            </div>
    </div>
  )
}

export default CartItem