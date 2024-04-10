import React from "react";
import elec from "../asset/elec.webp";
import grocery from "../asset/grocery.webp";
import mobile from "../asset/mobile.webp";
import appliences from "../asset/appliences.webp";
import fashion from "../asset/fashion.webp";
import "./InventoryHome.css";
import Laptop from "./Laptop";
import { Link } from "react-router-dom";
import AllProduct from "./AllProduct";
const InventoryHome = () => {
  return (
    <div className="inventory-main">
      <div className="category">
        <div className="image-sec">
          <div className="imge">
          <img src={elec} alt="image" />
          </div>
         
           <p>Electronics</p>
        </div>
        <div className="image-sec">
          <div className="imge">
          <img src={grocery} alt="" />
          </div>
         
          <p>Grocery</p>
        </div>
        <Link to='/product-info'> 

        <div className="image-sec">
          <div className="imge">
          <img src={mobile} alt="" />
          </div>
         
         <p>Mobile</p>
         
        </div>
        </Link>
        <div className="image-sec">
          <div className="imge">
          <img src={appliences} alt="" />
          </div>
         
         <p>Appliences</p>
        </div>
        <div className="image-sec">
          <div className="imge">
          <img src={fashion} alt="" />
          </div>
          
       <p>Fashion</p>
        </div>
      </div>
      <div className="laptop-section">
        <Laptop/>
      </div>
      <div className="product-section">
        <AllProduct/>
      </div>
    </div>
  );
};

export default InventoryHome;
