import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove from '../../assets/cross_icon.png'
const ListProduct = () => {
  const [allproducts,setallProducts]=useState([])
  useEffect(()=>{
    getAllProducts()
  },[])
  const removeProduct=async(id)=>{
    console.log(id);
    await fetch('http://localhost:4000/removeproduct',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await getAllProducts()
  }
  const  getAllProducts=async()=>{
    await fetch('http://localhost:4000/allproduct')
    .then((res)=>res.json())
    .then((data)=>{setallProducts(data)})
  }
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="list-main"><p>Products</p>
      <p>Title</p>
      <p>Old Price</p>
      <p>New Price</p>
      <p>Category</p>
      <p>Remove</p></div>
      <div className="allpdt">
        <hr />
    {allproducts.map((pdt,index)=>{
      return <>
      <div key={index} className='list-main list-format'>
        <img src={pdt.image} alt="" className="pdt-icon" />
        <p>{pdt.name}</p>
        <p>${pdt.old_price}</p>
        <p>${pdt.new_price}</p>
        <p>{pdt.category}</p>
        <img onClick={()=>{removeProduct(pdt.id)}} src={remove} alt="" className="remove-icon" />

      </div>
      <hr /></>
    })}
      </div>
    </div>
  )
}

export default ListProduct