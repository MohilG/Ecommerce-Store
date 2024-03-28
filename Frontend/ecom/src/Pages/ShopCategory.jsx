import React,{useContext} from 'react'
import './ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import drop_icon from '../Components/Assests/dropdown_icon.png'
import Item from '../Components/Items/Item'
const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img className='banner' src={props.banner} alt="" />
      <div className="indexSort">
        <p><span>Showing 1-12</span>out of 36 products</p>
        <div className="sort">
          Sort by <img src={drop_icon} alt="" />
        </div>
      </div>
      <div className="products">
        {all_product.map((item,i)=>{
            if (props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            }
            else {
              return null;
            }
        })}
      </div>
      <div className="loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory