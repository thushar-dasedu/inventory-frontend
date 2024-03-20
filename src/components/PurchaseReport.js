import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import API from '../axios';
import Pagination from './Pagination';
 
const PurchaseReport = () => {
const [purchaseData,setPurchaseData] =useState([]);

const [currentPage, setCurrentPage]=useState(1);
const [recordsPerPage]=useState(15);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;


useEffect(()=>{
    const fetchData=async()=>{
        const response=API.get('/purchase-detail/get-all-purchase',{
          headers:{
            'Authorization': 'basic '+ btoa('smith:smith123')
          }
        });
    setPurchaseData((await response).data);}
    fetchData();

},[]);

const currentRecords = purchaseData.slice(indexOfFirstRecord, indexOfLastRecord);

const nPages = Math.ceil(purchaseData.length / recordsPerPage)
  return (
    <div>   <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>Id</th>
        <th>Purchase id</th>
        <th>Supplier name</th>
        <th>Purhase date time</th>
        <th>Product model name</th>
        <th>Unit price</th>
        <th>quantity</th>
        <th> Discount amount</th>
        <th>Net amount</th>
        <th>Tax amount</th>
      </tr>
    </thead>
    <tbody>
    {currentRecords.map((data)=>{
        return( <tr>
            <td>{data.purchaseDetailId}</td>
            <td>{data.purchaseId}</td>
            <td>{data.supplierName}</td>
            <td>{data.purchaseDatetime}</td>
            <td>{data.productModelName}</td>
            <td>{data.unitPrice}</td>
            <td>{data.quantity}</td>
            <td>{data.discountAmount}</td>
            <td>{data.netAmount}</td>
            <td>{data.taxAmount}</td>
          </tr>);
    })} 
     
    </tbody>
  </Table> 
  <div className='container mt-5'>
             
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    </div>
  )
}

export default PurchaseReport