import React, { useEffect, useState } from 'react'
import Sellerpanel from './Sellerpanel'
import {Link} from 'react-router-dom'
import { getOrderRequests } from './Axios'
export default function Orderrequests() {
  const [request, setRequests] = useState([])
    useEffect(()=>{
      const getOrders=async()=>{
        const fetchOrders = await getOrderRequests()
        setRequests(fetchOrders)
      }
      getOrders()
    },[])
  return (
    <>
    <Sellerpanel/>
    <div className="orderrequests">
    {request.map((e) => (
          <div className="productdata" key={e._id}>
            <img
              className="img"
              src={e.image}
              alt=""
            />
            <div className="productdescription">
              <div className="productdetails">
                <h4>{e.productname}</h4>
                <h5>{e.location}</h5>
              </div>
              <div className="seemore">
                <Link to={`/receivedrequests/${e._id}`} >
                <button className="see" style={{textDecoration:"none"}}>See more</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
    </div>
    </>
  )
}
