import React, { useState } from 'react'
import API from '../axios';
import { useNavigate } from 'react-router-dom';

const SupplierInsertion = (props) => {
    const data={
        supplierName:"",
        supplierAddress:"",
        mobileNumber:"",
        email:""
    };
    const navigate=useNavigate();
    const [inputData,setInputData]=useState(data);
    const [errorMessage, setErrorMessage] = useState("");


    const handleData=(e)=>{
        setInputData({...inputData, [e.target.name] :e.target.value})
    } ;
    const submitData=async(e)=>{
        e.preventDefault();
        if (!inputData.supplierName || !inputData.supplierAddress || !inputData.mobileNumber || !inputData.email) {
            setErrorMessage("Please fill in all fields.");
            return;
          }
          try{
            const response=await API.post(`/supplier/add-supplier`,inputData,{
              headers:{
                'Authorization': 'basic '+ btoa('smith:smith123')
              }
            });
            console.log(response.data);
            navigate('/supplier-info');
          }
          catch(error){
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage("An error occurred. Please try again later.");
              }
          }

    
    };


    
    

  return (
    <div className="supplier-insert" style={{ height: "100%", width: "100%" }}>
      <div className="top">
        <h2 className="h2">{props.title}</h2>
      </div>
      <div className="supplier-form">
        <form>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              supplier name
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='supplierName'
              value={inputData.supplierName}
              onChange={handleData}
              placeholder="enter name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              supplier address
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='supplierAddress'
              value={inputData.supplierAddress}
              onChange={handleData}
              placeholder="supplier address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              {" "}
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile_number"
              className="form-control"
              name='mobileNumber'
              pattern="[0-9]{10}"
              required
              value={inputData.mobileNumber}
              onChange={handleData}
              placeholder="enter 10 digit number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              value={inputData.email}
              onChange={handleData}
              placeholder="enter email address"
              required
            />
          </div>

          <button className="btn btn-primary" onClick={submitData}>
            {props.btnvalue}
          </button>

          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      </div>
    </div>
  )
}

export default SupplierInsertion