import React, { useEffect, useState } from 'react';
import { approveSeller, delSellerRequest, getSellerRequests, logout } from './Axios'
import {Link, useNavigate} from 'react-router-dom'
import Admin from './Admin';
export default function Sellerlist() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
    const handlelogout = async() =>{
        const response = await logout()
        if(response.status ===200){
            navigate("/login")
        }
    }
    useEffect(()=>{
      const sellerRequests= async()=>{
        const request = await getSellerRequests()
        setRequests(request.data)
      }
      sellerRequests()
    },[])
    const handleDelete = async (id) => {
      try {
        await delSellerRequest(id)
        setRequests(requests.filter((request) => request._id !== id));
      } catch (error) {
        console.error("Failed to delete request:", error);
      }
    };
    const handleApprove= async (request, id)=>{
      try{
        await approveSeller(request, id)
        window.location.reload()
      } catch(error){
        console.error("Failed to approve the seller: ", error)
      }
    }    
  return (
    <>
      <Admin/>
      <div className="sellerlist">
        <h1>Have a Look Over Registration Requests</h1>
        <table className="seller-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.slice().reverse().map((request, index)=>(
              <tr key={request._id}>
                <td>{index+1}</td>
                <td>{request.name}</td>
                <td>{request.address}</td>
                <td>{request.contact}</td>
                <td>{request.email}</td>
                <td>{request.category}</td>
                <td><button className="remove-button" style={{backgroundColor:"#28a745"}} onClick={()=>handleApprove(request, request._id)} >Approve</button>
              <button className="remove-button" onClick={()=>handleDelete(request._id)}>Remove</button></td>
              </tr>
))}
          </tbody>
        </table>
        <button className='backhomie1' onClick={handlelogout}>Logout</button>
        <Link to="/admin" className='backhomie'>Go Back</Link>
      </div>
    </>
  );
}

