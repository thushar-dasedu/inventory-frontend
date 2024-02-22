import React from 'react';
import './Inventory.css';
import { Link } from 'react-router-dom';

const InventoryComponent = () => {
  return (
    <div  ><div className="header">
     <i class="ri-store-3-line"></i>
        <h3>Inventory</h3>
    </div> 
    <div className="Home">
    <i class="ri-home-4-fill"></i>
  <Link to='/'>Home</Link>  
    </div>
    <div className="customer">
    
       <Link to='/customer-info'> Customer </Link>
       </div>
       <div className="customer">
    
       <Link to='/supplier-info'> supplier</Link>
       </div>
       
    </div>
  )
}

export default InventoryComponent