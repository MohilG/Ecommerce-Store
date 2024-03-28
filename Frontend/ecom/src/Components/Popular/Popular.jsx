import React from 'react';
import './Popular.css';
import product_data from '../Assests/data';
import Item from '../Items/Item';
import { useState } from 'react';
import { useEffect } from 'react';

const Popular = () => {
  const [product_data,set_product_data]=useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>set_product_data(data))
  },[])
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className="popular-item">
            {product_data.map((item, i) => (
                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
        </div>
    </div>
  );
};

export default Popular;
