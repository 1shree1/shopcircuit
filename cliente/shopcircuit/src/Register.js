import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { newseller } from "./Axios";
export default function Register() {
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
    const selectCategory = ((e)=>{
        setCategory(e.target.value)
    })
    const[name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('') 
    const [error, setError] = useState('')
    const newSellerdetails = {name, address, contact, email, password, category}
    const workDone = async(e) => {
      e.preventDefault();
      try {
          const response = await newseller(newSellerdetails);
          if (response.status === 200) {
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your registration has been completed! You will be able to log in soon",
                  showConfirmButton: true,
                  timer: 2500,
              });
              navigate("/login");
          }
      } catch (error) {
          if (error.response && error.response.status === 400) {
              setError(error.response.data);
          } else {
              setError("Registration form invalid");
          }
      }
  };
 
  
  return (
    <>
      <h1 style={{marginTop:"2%", marginLeft:"35%"}}>Register yourself as a Seller</h1>
      <div className="registrationform">
        <form action="" method="post" className="regform" onSubmit={workDone}>
        <input className="reginput" type="text" placeholder="enter your name" name="name" onChange={(e)=>{setName(e.target.value)}} required/>
        <input className="reginput" type="text" placeholder="enter your address" name="Address" onChange={(e)=>{setAddress(e.target.value)}} required/>
        <input className="reginput" type="text" placeholder="contact no" name="contact" onChange={(e)=>{setContact(e.target.value)}} required/>
          <input className="reginput" type="text" placeholder="enter your email" name="email" onChange={(e)=>{setEmail(e.target.value)}} required/>
          <input className="reginput" type="password" placeholder="set your password" name="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
          <select name="category" className="reginput" value={category} onChange={selectCategory} required>
            <option value="" disabled>Select your product category</option>
            <option value="Apparel & accessories">Apparel & accessories</option>
            <option value="Automobiles">Automobiles</option>
            <option value="Beauty and health">Beauty & Health</option>
            <option value="Books and learning">Books and Learning</option>
            <option value="Business and industrial">Business & Industrial</option>
            <option value="Computers peripheral">Computers and Peripherals</option>
            <option value="Electronics">Electronics</option>
            <option value="Events and happenigs">Events & Happenings</option>
            <option value="fresh veggies and meat">Fresh veggies & meat</option>
            <option value="furnishing and appliances">Furnishing & Appliances</option>
            <option value="music and instruments">Music instruments</option>
            <option value="pets and pet care">Pets & Pet Care</option>
            <option value="real estate">Real Estate</option>
            <option value="services">Services</option>
            <option value="fitness">Fitness</option>
            <option value="toys video and games">Toys & video games</option>
            <option value="travel and tourpackages">Travel, Tour & Packages</option>
          </select>
          {error && <div className="error-message" style={{color: "red", fontWeight:"bold"}}>{error}</div>}
          <button className="regbutton" type="submit">Register</button>
          <Link to="/">Get Back to Home page</Link>
        </form>
      </div>
    </>
  );
}
