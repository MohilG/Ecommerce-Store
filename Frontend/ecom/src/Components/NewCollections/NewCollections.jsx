import React from 'react'
import './NewCollections.css'
// import new_collection from '../Assests/new_collections'
import Item from '../Items/Item'
import { useState } from 'react'
import { useEffect } from 'react'
const NewCollections = () => {
  const [new_collection,setNewCollection]=useState([])
  useEffect(()=>{
      fetch('http://localhost:4000/newcollection')
      .then((res)=>res.json())
      .then((data)=>setNewCollection(data)) },[])
  return (
    <div className='newC'>
        <h1>New Collections</h1>
        <hr />
        <div className="collections">
    {new_collection.map((item,i)=>{
              return  <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
    })}
        </div>
    </div>
  )
}

export default NewCollections