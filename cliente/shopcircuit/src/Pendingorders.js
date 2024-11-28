import React, { useEffect, useState } from 'react'
import Sellerpanel from './Sellerpanel'
import { getOrders, ordercompletion, acceptedOrders, requestAccomplished } from './Axios'

export default function Pendingorders() {
const [orders, setOrders]= useState([])
const [accepted, setAccepted] = useState([])
useEffect(()=>{
  const fetchAccepted=async()=>{
    const fetchy = await acceptedOrders()
    setAccepted(fetchy)
  }
  fetchAccepted()
},[])
console.log(accepted)

useEffect(()=>{
  const fetchOrders=async()=>{
    const fetch = await getOrders()
    setOrders(fetch)
  }
  fetchOrders()
},[])
const orderCompleted =  async(id) =>{
  await ordercompletion(id)
  window.location.reload()
}
const requestCompleted = async(id)=>{
  await requestAccomplished(id)
  window.location.reload()
}
  return (
    <>
    <Sellerpanel/>
    <div className="pendingorders">
        <h1>Pending orders</h1>
        <table className="seller-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((detail, index)=>(
              <tr key={detail._id}>
                <td>{index+1}</td>
                <td>{detail.name} </td>
                <td>{detail.location} </td>
                <td>{detail.contact} </td>
                <td>{detail.email} </td>
                <td>{detail.product.productname} </td>
                <td>{detail.product.price} </td>
                <td><button className="remove-button" style={{backgroundColor:"#228B22"}} onClick={()=>orderCompleted(detail._id)}>Order Completed</button></td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <h1>Orders taken</h1>
        <table className="seller-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accepted.map((value, index)=>(
              <tr key={value._id}>
                <td>{index+1}</td>
                <td>{value.name} </td>
                <td>{value.location} </td>
                <td>{value.contact} </td>
                <td>{value.productname} </td>
                <td>{value.price} </td>
                <td><button className="remove-button" style={{backgroundColor:"#228B22"}} onClick={()=>requestCompleted(value._id)}>Order Completed</button></td>
              </tr>
            ))}
          </tbody>
          
        </table>
    </div>
    </>
  )
}
