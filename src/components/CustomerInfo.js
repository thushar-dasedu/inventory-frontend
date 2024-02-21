import API from '../axios';
import React, { useEffect, useState } from 'react'
import './CustomerInfo.css'
import { Link } from 'react-router-dom';

const CustomerInfo = () => {

  
     
    const [APIdata,setAPIData]=useState([]);

    const getCustomerData= async()=>{
    const Response=await  API.get('/customer/get-all-customer');
    setAPIData(Response.data);    
    };


    useEffect(()=>{
         getCustomerData();

    },[])
  return (
     <div className="customer-container">
    <div className="head"><h1>Customer Details</h1> <button  className='buton'><Link to='/customer'>New</Link></button></div>
    <div className="table">
    <table class="table table-striped-columns" >
         
  <thead>
    <tr>
      <th scope="col">CustomerId</th>
      <th scope="col">CustomerName</th>
      <th scope="col">CustomerAddress</th>
      <th scope="col">MobileNumber</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        APIdata.map((data)=>{
            return(
                <tr>
                    <td>{data.customerId}</td>
                    <td>{data.customerName}</td>
                    <td>{data.customerAddress}</td>
                    <td>{data.mobileNumber}</td>
                    <td>{data.email}</td>
                    <td>
                      <td><button> edit</button></td>
                      <td><button> delete</button></td>
                    </td>
                </tr>
            )
        })
    }
    
  </tbody>
</table>
</div>
</div>
  )
}

export default CustomerInfo