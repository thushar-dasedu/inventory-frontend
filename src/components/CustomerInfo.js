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
const onDelete = (customerId)=>{
  if(window.confirm("Are you  sure want to delete customer detail?"))
   API.delete(`/customer/delete-customer-by/${customerId}`)
 
  .then(()=>{
    getCustomerData();
  })
}

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
                <tr key={data.customerId}>
                    <td>{data.customerId}</td>
                    <td>{data.customerName}</td>
                    <td>{data.customerAddress}</td>
                    <td>{data.mobileNumber}</td>
                    <td>{data.email}</td>
                    <td className='action-td'>
                      <div className='action-btn'><button  > <Link to={`/update-customer/${data.customerId}`}><i class="ri-edit-2-fill"></i></Link></button></div>
                      <div className='action-btn' ><button onClick={()=> onDelete(data.customerId)}> <i class="ri-delete-bin-6-fill"></i></button></div>
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