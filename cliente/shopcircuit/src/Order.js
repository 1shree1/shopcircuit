import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { newOrder, viewProduct } from './Axios'
import Swal from 'sweetalert2'
import { formatDistanceToNow } from 'date-fns'
export default function Order() {
  const [product, setProduct] = useState({})
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id
  useEffect(()=>{
    const getProduct = async()=>{
      const fetchProduct = await viewProduct(id)
      setProduct(fetchProduct)
    }
    getProduct()
  },[id])
  
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const[location, setLocation] = useState('')
  const formData = {
    name, contact, email, location, productOrdered : product._id, sellerOfProduct: product.sellerid
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    await newOrder(formData)
    Swal.fire("Product Ordered");
    navigate("/")
  }
  return (
    <>
    <Navbar/>
    <div className="order">
      <div className="details">
        <img className='orderimg' src={product.img ? `data:image/jpeg;base64,${product.img}` : ''}  alt="" />
        <div style={{paddingLeft:"2%"}}> 
        <h1>{product.productname} </h1>
        <h3>{product.category}</h3>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <h3>{product.model}</h3>
        <h3>{product.date ? formatDistanceToNow(new Date(product.date), { addSuffix: true }) : ''}</h3>
        </div>
        <h3>Rs.{product.price}</h3>
        <textarea className='textdetail' placeholder={`${product.description}`}></textarea>
        <h4>Distributed by: {product.seller}</h4>
      </div>
      </div>
      <div className="orderform">
        <h1>Confirm your order</h1>
        <form className='orderconfirmationform' action="post" onSubmit={handleSubmit}>
          <input className='orderinput' onChange={(e)=>setName(e.target.value)} name="name" type="text" placeholder='enter your name' required/>
          <input className='orderinput' onChange={(e)=>setContact(e.target.value)} name="contact" type="text" placeholder='enter your contact number' required/>
          <input className='orderinput' onChange={(e)=>setEmail(e.target.value)} name="email" type="text" placeholder='enter your email'required/>
          <input className='orderinput' onChange={(e)=>setLocation(e.target.value)} name="location" type="text" placeholder='Location' required/>
          <button className='orderbut' type='submit'>Place an order</button>
          <Link to="/"><button className='backhome'>Back to Home page</button></Link>
        </form>
      </div>
    </div>
    </>
  )
}