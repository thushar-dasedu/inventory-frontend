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
 
      <details className="customer">
    
     <summary style={{color:'white'}}> Customer </summary>
     <div><Link to='/customer-info'>View Customer </Link></div>
     <div><Link to='/customer'>New customer</Link></div>
       
       </details>
       <div className='supplier' >
    
       <Link to='/supplier-info'> Supplier</Link>
       </div>
       <div className="product">
        <Link to='/product'>Product</Link>
       </div>
       <div className="purchase"><Link to='/purchase'>Purchase</Link></div>

    </div>
  )
}

export default InventoryComponent