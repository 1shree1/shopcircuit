import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
export default function Gethelp() {
  return (
    <>
    <div className="help">
    <Navbar/>
    </div>
    <div className='gethelp'>
    <h1>Need some Help?</h1>
    <h2>Feel free to contact us</h2>
    <h5>Email: shopcircuit378@gmail.com</h5>
    <h5>Contact no: 01-4810105, 01-2297416</h5>
    <p>Please do visit at our office located at Tikathali marg</p>
    <br />
    <Link to="/">Get Back to Home page</Link>
    </div>
    </>
  )
}
