import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../axios'
import './CustomerInfo.css'

const UpdateSupplier = (props) => {
    const navigate=useNavigate();
const {supplierId} = useParams();
const [supplierData,setSupplierData]=useState({
    supplierId:"",
    supplierName:"",
    supplieAddress:"",
    mobileNumber:"",
    email:"",
});
useEffect(()=>{
    const fetchSupplierData=async()=>{
        try{
            const response=await API.get(`/supplier/get-supplier-id/${supplierId}`);
            setSupplierData(response.data);
           } catch(error){
            console.error("Error fetching customer data:", error);
           }
        } 
     
    fetchSupplierData();
},[supplierId]);
 
const handleChange=(e)=>{
const{name,value}=e.target;
setSupplierData((prevData)=>({
    ...prevData,[name]:value   
}) );
};

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await API.put(`/supplier/update-supplier/${supplierId}`,supplierData);
        console.log(response.data);
        navigate('/supplier-info');
    }catch (error) {
        console.error("Error updating customer:", error);
      }

}

  return (
    <div className="supplier-insert" style={{ height: "100%", width: "100%" }}>
    <div className="top">
      <h2 className="h2">{props.title}</h2>
    </div>
    <div className="supplier-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="supplierId" className="form-label">
            supplier Id
          </label>
          <input
            type="text"
            value={supplierData.supplierId}
            id="supplierId"
            className="form-control"
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supplierName" className="form-label">
            supplier Name
          </label>
          <input
            type="text"
            value={supplierData.supplierName}
            id="supplierName"
            className="form-control"
            name="supplierName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supplierAddress" className="form-label">
            supplier Address
          </label>
          <input
            type="text"
            value={supplierData.supplierAddress}
            id="supplierAddress"
            className="form-control"
            name="supplierAddress"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            value={supplierData.mobileNumber}
            id="mobileNumber"
            className="form-control"
            name="mobileNumber"
            pattern="[0-9]{10}"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={supplierData.email}
            id="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {props.btnvalue}
        </button>
      </form>
    </div>
  </div>
  )
}

export default UpdateSupplier