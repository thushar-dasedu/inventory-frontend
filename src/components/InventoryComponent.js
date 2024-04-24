import React from 'react';
import './Inventory.css';
import { Link } from 'react-router-dom';

const InventoryComponent = () => {
    return (
        <div className="container">
            <div className="header">
                <i className="ri-store-3-line"></i>
                <h3>Inventory</h3>
            </div>
            <div className="Home">
                <i className="ri-home-4-fill"></i>
                <Link to='/'><h3>Home</h3></Link>
            </div>

            {/* <details className="customer">
                <summary style={{ color: 'white' }}> Customer </summary>
                <div><Link to='/customer-info'>View Customer</Link></div>
                <div><Link to='/customer'>New customer</Link></div>
            </details> */}

            <div className='supplier'>
                <span> Customer</span>
                <div className="dropdown-content">
                   
                <Link to='/customer-info'>View Customer</Link>
                <Link to='/customer'>New customer</Link>
                </div>
            </div>

            <div className='supplier'>
                <span>Supplier</span>
                <div className="dropdown-content">
                   
                    <Link to='/supplier-info'>List Supplier</Link>
                    <Link to='/supplier'>Add new supplier</Link>
                </div>
            </div>

            <div className="product">
                <Link to='/product'>Product</Link>
            </div>
            <div className="purchase"><Link to='/purchase'>Purchase</Link></div>
            <div className="sale">
                <span>Sale</span>
                <div className="dropdown-content">
                    <Link to='/list-sale'>List Sale</Link>
                    <Link to='/add-sale'>New</Link>
                    <Link to='/sale-report'>sales report</Link>
                   
                </div>
            </div>
        </div>
    );
}

export default InventoryComponent;
