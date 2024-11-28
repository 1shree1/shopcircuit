import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import { useLocation, Link } from "react-router-dom";

export default function Searched() {
  const location = useLocation();
  const items = location.state?.items || [];

  return (
    <>
      <Navbar />
      <Search />
      <div className="data">
        {items.length === 0 ? (
          <div className="no-items">
            <h2>No items found for your search</h2>
          </div>
        ) : (
          items
            .slice()
            .reverse()
            .map((value) => (
              <div className="individualdata" key={value._id}>
                <img
                  className="img"
                  src={`data:image/jpeg;base64,${value.img}`}
                  alt={value.productname || "Product"}
                />
                <div className="description">
                  <div className="nameprice">
                    <h4>{value.productname}</h4>
                    <h5>Rs.{value.price}</h5>
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
