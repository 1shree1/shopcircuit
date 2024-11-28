import React from "react";
import { Link } from "react-router-dom";
import { FaRegCircleQuestion } from "react-icons/fa6";
export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Link to="/login" className="sidebarbutton">
          <button className="button">Login in</button>
        </Link>
        <Link to="/gethelp" className="sidebarbutton">
        <button  className="button">
          <FaRegCircleQuestion style={{ backgroundColor: "red" }} /> Get Help
        </button>
        </Link>
      </div>
    </>
  );
}
