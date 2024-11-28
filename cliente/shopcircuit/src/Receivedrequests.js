import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sellerpanel from './Sellerpanel'
import { useNavigate, useParams } from 'react-router-dom'
import { orderTaken, requestitem } from './Axios'
import { formatDistanceToNow } from 'date-fns'
export default function Receivedrequests() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [item, setItem] = useState({});
    
    useEffect(() => {
      const getproduct = async () => {
        const product = await requestitem(id);
        setItem(product);
      };
      getproduct();
    }, [id]);
    
    const takeOrder = async()=>{
        await orderTaken(id)
        navigate("/pendingorders")
    }
  
    return (
      <>
        <Navbar />
        <Sellerpanel />
        <div className="receivedrequests">
          <div className="requestimg-container">
            <img className="requestimg" src={item.image} alt="Product" />
          </div>
          <div className="request-info">
            <h1 className="product-name">{item.productname || "Product name"}</h1>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <h1 className="budget">{item.price ? `Rs.${item.price}` : "Budget"}</h1>
            <h3 className='budget'>{item.date ? formatDistanceToNow(new Date(item.date), { addSuffix: true }) : ''}</h3>
            </div>
            <h3 className="location">Location: {item.location || "Unknown"}</h3>
            <h4 className="contact">Contact: {item.contact || "Not provided"}</h4>
            <h5 className="description">Description: {item.description || "No description"}</h5>
            <button type='button' onClick={takeOrder}>Take order</button>
          </div>
        </div>
      </>
    );
  }
  