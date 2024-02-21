import React, { useState } from "react";
import "./CustomerInfo.css";
import API from "../axios";

const CustomerInsertion = (props) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitData = async () => {
    if (!customerName || !customerAddress || !mobileNumber || !email) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
   
      const customerData = {
        customerName,
        customerAddress,
        mobileNumber,
        email,
      };
      try {
      const response = await API.post("/customer/add-customer", customerData);

      console.log("customer added success full", response.data);
    } catch (error) {
      if (  error.response.status === 400) {
        // Server responded with a 400 status code (Bad Request)
        setErrorMessage(error.response.data.message);
      } else {
        // Handle other types of errors
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
              value={customerName}
              onChange={(e) => {
                
                setCustomerName(e.target.value);
              }}
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
              value={customerAddress}
              onChange={(e) => {
               
                setCustomerAddress(e.target.value);
              }}
              placeholder="Customer address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              {" "}
              Mobile Number
            </label>
            <input
              input
              type="tel"
              id="mobile_number"
              className="form-control"
              name="mobile_number"
              pattern="[0-9]{10}"
              required
              value={mobileNumber}
              onChange={(e) => {
                 
                setMobileNumber(e.target.value);
              }}
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
              name="email"
              value={email}
              onChange={(e) => {
               
                setEmail(e.target.value);
              }}
              placeholder="enter email address"
              required
            />
          </div>

          <button
            
            className="btn btn-primary"
            onClick={submitData}
          >
           {props.btnvalue}
          </button>

          {  <div className="error">{errorMessage}</div>}
        </form>
       
      </div>
    </div>
  );
};

export default CustomerInsertion;
