 import React from 'react'

 import './Purchase.css'
import { useState } from 'react';
import SearchBar from './SearchBar';
 
 const Purchase = () => {
    const[searchId,setSearchId]=useState();
   return (
     <div className='purchase-container'>
      <h3>New Purchase Order</h3> 
      <SearchBar name="supplier"  setSearchId={setSearchId}/> 
     <div className="purchase-item">
     <table>
    
     <tr>
        <th>
            Product Model
        </th>
        <th>
            Unit Price
        </th>
        <th>
            Quantity
        </th>
        <th>
            Discount(%)
        </th>
        <th>
            Discount Amount
        </th>
        <th>Net Amount</th>
        <th></th>
     </tr>
     <tr>
     <SearchBar name="product"  setSearchId={setSearchId} />
        <td><input type="number" /></td>
        <td><input type="number" /></td>
        <td><input type="number" /></td>
        <td>0.00</td>
        <td>0.00</td>
        <td><i className="ri-close-circle-fill"></i></td>
     </tr>
     </table>
     </div>
     </div>
   )
 }
 
 export default Purchase