import React from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from './Axios'
export default function Admin() {
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
    <div className="body">
        <div className='controlButtons'>
            <Link to="/sellerlist"> <button className='ctrlbutton'>Sellers List</button> </Link>
            <Link to="/registrationrequest"> <button className='ctrlbutton' style={{backgroundColor:"green"}}>New Registration Request</button> </Link>
            <Link to="/postlists"> <button className='ctrlbutton' style={{backgroundColor:"#9B59B6"}}>Posts</button> </Link>
            <button className='ctrlbutton' style={{backgroundColor:"red"}} onClick={handlelogout}>Logout</button>
        </div>
    </div>
    </>
  )
}
