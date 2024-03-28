import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {
  const [image,setImage]=useState(false)
  const [productD,setProductD]=useState({
    name:"",
    image:"",
    category:"",
    new_price:"",
    old_price:""
  })
  const changeHandle=(e)=>{
    setProductD({...productD,[e.target.name]:e.target.value})
  }
  const addProduct=async()=>{
    let response;
    let product=productD
    let formData=new FormData()
    formData.append('product',image)
    await fetch('http://localhost:4000/upload',{
      method:"POST",
      headers:{
        Accept:"application/json"
      },
      body:formData,
    }).then((res)=> res.json()).then((data)=>{response=data})
    if(response.success){
      product.image=response.image_url
      console.log(JSON.stringify(product));
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
      }).then((res)=>res.json()).then((data)=>{
       if(data.success) alert('Product Added')
      else alert('Failed')
    }
        )
    }
  }
  const imageHandler=(e)=>{
    setImage(e.target.files[0])
  }
  return (
    
      <div className="add-product">
      <div className="add-item">
        <p>Product Title</p>
    <input type="text" placeholder='Enter product title' value={productD.name} name='name' onChange={changeHandle} />
      </div>
      <div className="add-price">
        <div className="add-item">
          <p>Price</p>
          <input value={productD.old_price} onChange={changeHandle} type="text" name='old_price' placeholder='Old Price' />
        </div>
        <div className="add-item">
          <p>Offer Price</p>
          <input value={productD.new_price} onChange={changeHandle} type="text" name='new_price' placeholder='New Price' />
        </div>
        </div>

        <div className="add-item">
          <p>Product Category</p>
          <select value={productD.category} onChange={changeHandle} name="category" className='product-selector' id="">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>

          </select>
        </div>
        <div className="add-item"><label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='thumbnail' alt="" /></label></div>
          <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      <button onClick={addProduct} className='add-btn'>
        ADD
      </button>
      </div>
  )
}

export default AddProduct