import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { viewListeditem } from "./Axios";
export default function Data() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  useEffect(()=>{
    const getProducts = async()=>{
      try{
        const fetchProduct = await viewListeditem()
        setProducts(fetchProduct)
      }catch(err){
        setError("No connection, please try again later")
      }
    }
    getProducts()
  },[])
  return (
    <>
      <div className="data">
        {error ? (
          <h1>{error} </h1>
        ) : (
        products.slice().reverse().map((value) => (
          <div className="individualdata" key={value._id}>
            <img
              className="img"
              src={`data:image/jpeg;base64,${value.img}`}
              alt=""
            />
            <div className="description">
              <div className="nameprice">
                <h4>{value.productname} </h4>
                <h5>Rs.{value.price} </h5>
              </div>
              <div className="seemore">
                <Link to={`/order/${value._id}`}>
                <button className="see">Order Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </>
  );
}
