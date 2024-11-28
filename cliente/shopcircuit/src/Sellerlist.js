import React, { useEffect, useState } from "react";
import { delSeller, getSellers, logout } from "./Axios";
import { Link, useNavigate } from "react-router-dom";
import Admin from "./Admin";
export default function Sellerlist() {
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([])
  useEffect(()=>{
    const sellerlist = async()=>{
      const sell = await getSellers()
      setSellers(sell)
    }
    sellerlist()
  },[])
  const handlelogout = async () => {
    const response = await logout();
    if (response.status === 200) {
      navigate("/login");
    }
  };
  const handleDelete = async (id) =>{
    await delSeller(id)
    window.location.reload()
  }
  return (
    <>
      <Admin/>
      
      <div className="sellerlist">
        <h1>Have a Look Over Sellers</h1>
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
            {sellers.slice().reverse().map((value, index)=>(
              <tr key={value._id}>
                <td>{index+1}</td>
                <td>{value.name}</td>
                <td>{value.address}</td>
                <td>{value.contact}</td>
                <td>{value.email}</td>
                <td>{value.category}</td>
                <td>
                  <Link to={`/listeditems/${value._id}`}>
                <button className="remove-button" style={{backgroundColor:"#228B22"}}>See Listed items</button>
                </Link>
                <button className="remove-button" onClick={()=>handleDelete(value._id)}>Remove</button>
              </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <button className="backhomie1" onClick={handlelogout}>
          Logout
        </button>
        <Link to="/admin" className="backhomie">
          Go back
        </Link>
      </div>
    </>
  );
}
