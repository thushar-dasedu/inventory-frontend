import API from '../axios';
import React, { useEffect, useState } from 'react'
import './CustomerInfo.css'
import { Link } from 'react-router-dom';

const SupplierComponent = () => {

  
     
    const [APIdata,setAPIData]=useState([]);

    const getSupplierData= async()=>{
    const Response=await  API.get('/supplier/get-all-supplier',{
      headers:{
        'Authorization': 'basic '+ btoa('smith:smith123')
      }
    });
    setAPIData(Response.data);    
    };


    useEffect(()=>{
         getSupplierData();

    },[])
const onDelete = (supplierId)=>{
  if(window.confirm("Are you  sure want to delete supplier detail?"))
   API.delete(`/supplier/delete-supplier-by/${supplierId}`)
 
  .then((response)=>{
    console.log(response.data);
    getSupplierData();
  })
}

  return (
     <div className="supplier-container">
    <div className="head"><h1>Supplier details</h1> <button  className='buton'><Link to='/supplier'>New</Link></button></div>
    <div className="table">
    <table class="table table-striped-columns" >
         
  <thead>
    <tr>
      <th scope="col">SupplierId</th>
      <th scope="col">SupplierName</th>
      <th scope="col">SupplierAddress</th>
      <th scope="col">MobileNumber</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        APIdata.map((data)=>{
            return(
                <tr key={data.supplierId}>
                    <td>{data.supplierId}</td>
                    <td>{data.supplierName}</td>
                    <td>{data.supplierAddress}</td>
                    <td>{data.mobileNumber}</td>
                    <td>{data.email}</td>
                    <td className='action-td'>
                      <div className='action-btn'><button  > <Link to={`/update-supplier/${data.supplierId}`}><i class="ri-edit-2-fill"></i></Link></button></div>
                      <div className='action-btn' ><button onClick={()=> onDelete(data.supplierId)}> <i class="ri-delete-bin-6-fill"></i></button></div>
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

export default SupplierComponent