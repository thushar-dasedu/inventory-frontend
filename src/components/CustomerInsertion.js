import React, { useState } from "react";
import "./CustomerInfo.css";
import API from "../axios";
import { useNavigate } from "react-router-dom";

const CustomerInsertion = (props) => {
  const navigate = useNavigate();
   const data={
    customerName:"",
    customerAddress:"",
    mobileNumber:"",
    email:""
   };
   const [inputData ,setInputData] =useState(data);

  const [errorMessage, setErrorMessage] = useState("");

  const handleData=(e)=>{
    setInputData({...inputData, [e.target.name] :e.target.value})
  }
  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    // Only allow input if it's a number and it's less than or equal to 10 characters
    if (!isNaN(value) && value.length <= 10) {
      setInputData(prevData => ({
        ...prevData,
        mobileNumber: value
      }));
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    if (!inputData.customerName || !inputData.customerAddress || !inputData.mobileNumber || !inputData.email) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
     const response= await API.post("/customer/add-customer",  inputData);
     console.log(response.data);
      // Navigate to customer info page after successful insertion
      navigate('/customer-info');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="customer-insert" style={{ height: "100%", width: "100%" }}>
      <div className="top">
        <h2 className="h2">{props.title}</h2>
      </div>
      <div className="customer-form">
        <form>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Customer name
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='customerName'
              value={inputData.customerName}
              onChange={handleData}
              placeholder="enter name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Customer address
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='customerAddress'
              value={inputData.customerAddress}
              onChange={handleData}
              placeholder="Customer address"
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
              onChange={handleMobileNumberChange}
              placeholder="enter 10 digit number"
            />
            {inputData.mobileNumber.length !== 10 && (
        <div style={{ color: 'red' }}>Please enter exactly 10 digits</div>
      )}
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
  );
};

export default CustomerInsertion;
