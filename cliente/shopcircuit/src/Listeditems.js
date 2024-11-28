import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { seeListedItems } from "./Axios";

export default function Listeditems() {
  const params = useParams();
  const id = params.id;
  const [sellerproducts, setSellerproducts] = useState([]);
  useEffect(() => {
    const getproducts = async () => {
      const productlist = await seeListedItems(id);
      setSellerproducts(productlist);
    };
    getproducts();
  });
  const navigate = useNavigate();
  const goBack = () => {
    const backpage = () => {
      navigate(-1);
    };
    backpage();
  };
  return (
    <>
      <Navbar />
      <div className="listeditems">
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sellerproducts.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.productname} </td>
                <td>{value.price}</td>
                <td>{value.description}</td>
              </tr>
            ))}
          </tbody>
          <button
            style={{
              backgroundColor: "red",
              width: "7%",
              height: "20%",
              position: "absolute",
              right: "5%",
              boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "white",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onClick={goBack}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.4)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Go Back
          </button>
        </table>
      </div>
    </>
  );
}
