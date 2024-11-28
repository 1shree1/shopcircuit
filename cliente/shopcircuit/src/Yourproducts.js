import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Sellerpanel from "./Sellerpanel";
import { getProducts } from "./Axios";
export default function Yourproducts() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const fetch = await getProducts();
      setProduct(fetch);
    };

    fetchproducts();
  }, []);
  
  return (
    <>
      <Sellerpanel />
      <div className="productbody">
        {product
          .slice()
          .reverse()
          .map((value) => (
            <div className="productdata" key={value._id}>
              <img
                className="img"
                src={`data:image/jpeg;base64,${value.img}`}
                alt=""
              />
              <div className="productdescription">
                <div className="productdetails">
                  <h4>{value.productname} </h4>
                  <h5> {value.price}</h5>
                </div>
                <div className="seemore">
                  <Link to={`/updateyourproduct/${value._id}`}>
                  <button className="see" style={{textDecoration:"none"}}>Update</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
