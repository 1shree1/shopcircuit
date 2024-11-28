import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import { addRequirement } from './Axios'
export default function Postrequirement() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
  const [productname, setProductName]= useState('')
  const [contact, setContact] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const[image, setImage] = useState(null)
  const [category, setCategory] = useState("")
  const selectCategory = ((e)=>{
      setCategory(e.target.value)
  })

  const handleImageChange= (e)=>{
    setImage(e.target.files[0])
  }
  const post = async(e)=>{
    e.preventDefault()
  const formData = new FormData()
  formData.append('name', name)
    formData.append('productname', productname)
    formData.append('contact', contact)
    formData.append('price', price)
    formData.append('location', location)
    formData.append('category', category)
    formData.append('description', description)
    if (image) formData.append('image', image)
        await addRequirement(formData)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Soon a seller will contact you",
      showConfirmButton: true,
      timer: 2500,
  });
    navigate("/")
  };

  return (
    
    <>
    <Navbar/>
    <div className="post1">
        <h1>Post your Required item over here</h1>
        <form method='post' encType='multipart/form-data' onSubmit={post}>
        <input type="text" name="name" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} required/>
            <input type="text" name='productname' placeholder='Enter product name' onChange={(e)=>setProductName(e.target.value)} required/>
            <input type="text" name='contact' placeholder='Enter your contact number' onChange={(e)=>setContact(e.target.value)} required/>
            <input type="text" name='price' placeholder='Expected price' onChange={(e)=>setPrice(e.target.value)} required/>
            <input type="text" name='location' placeholder='Enter your location' onChange={(e)=>setLocation(e.target.value)} required/>
            <input type="text" name='description' placeholder='Any description' onChange={(e)=>setDescription(e.target.value)} required/>
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
            <input type="file" name='image' placeholder='Upload product image' onChange={handleImageChange} required/>
            <button type='submit'>Post</button>
            <Link to="/">
            <button style={{marginTop:"5px", width:"20%", marginLeft:"80%"}}>Go back</button>
            </Link>
        </form>
    </div>
    </>
  )
}
