import React, { useState } from 'react'
import Sellerpanel from './Sellerpanel'
import { addItem } from './Axios'
import { useNavigate } from 'react-router-dom'

export default function Additem() {
  const navigate = useNavigate()
  const [productname, setProductName]= useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const[image, setImage] = useState(null)

  const handleImageChange= (e)=>{
    setImage(e.target.files[0])
  }
  const Additem = async(e)=>{
    e.preventDefault()
  const formData = new FormData()
    formData.append('productname', productname)
    formData.append('model', model)
    formData.append('price', price)
    formData.append('description', description)
    if (image) formData.append('image', image)

    const result = await addItem(formData)
    navigate("/yourproducts")
  };
  
  return (
    <>
    <Sellerpanel/>
    <div className="additem">
        <form method='post' encType='multipart/form-data' onSubmit={Additem} className='additemform' >
            <input type="text" name='productname' placeholder='productname' onChange={(e)=>setProductName(e.target.value)} required/>
            <input type="text" name='model' placeholder='model' onChange={(e)=>setModel(e.target.value)} required/>
            <input type="text" name='price' placeholder='price' onChange={(e)=>setPrice(e.target.value)} required/>
            <input type="text" name='description' placeholder='description' onChange={(e)=>setDescription(e.target.value)} required/>
            <input type="file" name='image' placeholder='Upload product image' onChange={handleImageChange} />
            <button type='submit'>Upload</button>
        </form>
    </div>
    </>
  )
}
