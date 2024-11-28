import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from './Axios'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const data = {
    email,
    password
  }
  const Login = async(e)=>{
    e.preventDefault();
    try{
    const response = await login(data)
    if(response.data==="Login successful"){
      navigate("/admin")
    }
    if(response.data === "Seller login"){
      navigate("/seller")
    }
  }catch(error){
      setError("Couldn't Login watch your login details")
    }
  }
  return (
    <>
    <div className='loginform'>
        <h1>Login to your Account</h1>
        <form method='post' onSubmit={Login} className='logform'>
            <input className='loginput' type="text" placeholder='enter your email' name='email' onChange={(e)=>{setEmail(e.target.value)}} required/>
            <input className='loginput' type="text" placeholder='enter your password' name='password' onChange={(e)=>{setPassword(e.target.value)}} required/>
            <button className='loginbutton' type='submit'>Log in</button>
            {error && <div className="error-message" style={{color: "red", fontWeight:"bold"}}>{error}</div>}
            <h3>Don't have an account? <Link to="/register">Register here</Link> </h3>
            <Link to="/">Get Back to Home page</Link>
        </form>
    </div>
    </>
  )
}