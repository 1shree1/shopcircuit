import React, { useEffect, useState }  from 'react'
import Navbar from './Navbar'
import Sellerpanel from './Sellerpanel'
import { deleteitem, getProduct, updateyourproduct } from "./Axios";
import { useNavigate, useParams} from 'react-router-dom'
export default function Updateyourproduct() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [product, setProduct] = useState({});
    useEffect(() => {
      const fetchproducts = async (id) => {
        const fetch = await getProduct(id)
        setProduct(fetch);
      };
      fetchproducts(id);
    }, [id]);
    const [productname, setproductname] = useState(``)
    const [model, setmodel] = useState('')
    const [price, setprice] = useState('')
    const [description, setdescription]=useState('')
    const formData = {
        productname, model, price, description
    }
    const handleupdate = async(e)=>{
      e.preventDefault()
        try{
        await updateyourproduct(id, formData)
        navigate("/yourproducts")
        } catch(error){
            console.error(error)
        }
    }
    const deleteditem = async (id) => {
        await deleteitem(id);
        navigate("/yourproducts")
      };
  return (
    <>
    <Navbar/>
    <Sellerpanel/>
    <div className="updateproduct">
       <h1>Update Your product</h1>
       <div style={{display:"flex", gap:"5%"}}>
       
              <img className='updateimg' src={`data:image/jpeg;base64,${product.img}`} alt="where is the image" />
              <form onSubmit={handleupdate}>
                Product Name: <input name='productname' onChange={(e)=>setproductname(e.target.value)} type="text" placeholder={product.productname} required/> <br /><br />
                Model: <input type="text" placeholder={product.model} onChange={(e)=>setmodel(e.target.value)} required name='model'/><br /><br />
                Price: <input type="text" placeholder={product.price} onChange={(e)=>setprice(e.target.value)} required name='price'/><br /><br />
                Description: <textarea name="description" rows={4} onChange={(e)=>setdescription(e.target.value)} cols={35}>  </textarea><br /><br />
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <button className='update-button' type='submit'>Update</button>
                <button type='button' className='delete-button' onClick={() => deleteditem(product._id)}>Delete</button>
                </div>
              </form>
              </div>
    </div>
    </>
  )
}
