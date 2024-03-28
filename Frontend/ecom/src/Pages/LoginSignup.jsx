import React from 'react'
import './LoginSignup.css'
import { useState } from 'react'
const LoginSignup = () => {
  const [state,setState]=useState('Login')
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login = async()=>{
    console.log(formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)}
      window.location.replace('/')
  }
  const signUp=async()=>{
    console.log(formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace('/')  }
      else{
        alert(responseData.errors)
      }
    }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="fields">
         {state==='Sign Up' ?<input type="text" placeholder='Your Name' name="username" value={formData.username} onChange={changeHandler}  />:<></>}
          <input type="email" placeholder='Email Address' name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder='Password' name="password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={()=>{state==='Login'?login():signUp()}}>Continue</button>
        {state==='Sign Up'?<p className='login'>Already have an account? <span onClick={()=>setState('Login')}>Login</span></p>
        :<p className='login'>Create an account? <span onClick={()=>setState('Sign Up')}>Click Here</span></p>}

        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>I agree to terms and privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup