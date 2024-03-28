import React, { createContext, useState } from "react";
// import all_product from '../Components/Assests/all_product';
import { useEffect } from "react";

export const ShopContext = createContext(null);
const getDefaultCart=()=>{
    
        let cart={}
    for(let index=0;index < 300+1;index++){
        cart[index]=0;
    }
        return cart;
}

const ShopContextProvider = (props) => {

    const [cartItem,setCartItem]=useState(getDefaultCart())

    const [all_product,setallProduct]=useState({})
    useEffect(()=>{
            fetch('http://localhost:4000/allproduct')
            .then((res)=>res.json())
            .then((data)=>setallProduct(data))

        if(localStorage.getItem('auth-token')){
            console.log("cart");
            fetch('http://localhost:4000/getcart',
            {
                method:"POST",
                    headers:{
                        Accept:'application/json',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json'
                },
                body:""
            }).then((res)=>res.json()).then((data)=>setCartItem(data))
        }
    },[])
    const addToCart=(itemId)=>{
        // console.log(itemId);
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:"POST",
                headers:{
                Acept:"application/json",
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemid":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
    }
    }
    const removeFromCart=(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:"POST",
                headers:{
                Acept:"application/json",
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemid":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
    }
    }
    const getTotItem=()=>{
        let totItem=0
        for(const item in cartItem){
            totItem+=cartItem[item]
        }
        return totItem;
    }
   const getTotal = () => {
    let totAmount = 0;
    for (const itemId in cartItem) {
        if (cartItem[itemId] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(itemId));
            totAmount += itemInfo.new_price * cartItem[itemId];
        }
    }
    return totAmount;
};

    const contextValue = { all_product , cartItem , addToCart , removeFromCart , getTotal , getTotItem};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;  // Fix the export statement
