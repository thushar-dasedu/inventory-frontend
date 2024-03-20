import React from "react";
import elec from "../asset/elec.webp";
import grocery from "../asset/grocery.webp";
import mobile from "../asset/mobile.webp";
import appliences from "../asset/appliences.webp";
import fashion from "../asset/fashion.webp";
import "./InventoryHome.css";
import Laptop from "./Laptop";
import { Link } from "react-router-dom";
const InventoryHome = () => {
  return (
    <div className="inventory-main">
      <div className="category">
        <div className="image">
          <img src={elec} alt="image" />
          <div className="span"> <span>Electronics</span></div> 
        </div>
        <div className="image">
          <img src={grocery} alt="" />
          <div className="span"> <span>Grocery</span></div> 
        </div>
        <div className="image">
          <Link to='/product-info'> 
          <img src={mobile} alt="" />
          <div className="span">   <span>Mobile</span></div> 
          </Link>
        </div>
        <div className="image">
          <img src={appliences} alt="" />
          <div className="span"> <span>Appliences</span></div> 
        </div>
        <div className="image">
          <img src={fashion} alt="" />
        <div className="span"><span>Fashion</span></div>  
        </div>
      </div>
      <div className="laptop-section">
        <Laptop/>
      </div>
    </div>
  );
};

export default InventoryHome;
