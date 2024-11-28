import React from 'react'
import Navbar from './Navbar'
import { logout } from './Axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Sellerpanel() {
  const navigate = useNavigate()
  const handlelogout = async() =>{
    const response = await logout()
    if(response.status ===200){
        navigate("/login")
    }
}
  return (
    <>
    <Navbar/>
    <div className="sellerbody">
        <div className='sellerButtons'>
            <Link to="/yourproducts"> <button className='sellerbutton'>View your products</button> </Link>
            <Link to="/pendingorders"> <button className='sellerbutton'>View pending orders</button> </Link>
            <Link to="/orderrequests"> <button className='sellerbutton'>View order requests</button> </Link>
            <Link to="/additem"><button className='sellerbutton'>Upload a new Item</button> </Link>
            <button className='sellerbutton' onClick={handlelogout}>Logout</button>
        </div>
    </div>
    </>
  )
}
