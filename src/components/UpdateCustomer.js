import React, { useEffect } from "react";
import { useState } from "react";
import API from "../axios";
import { useParams } from "react-router-dom";
const UpdateCustomer = (props) => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState({});
  useEffect(() => {
    const fetchCustomerData = async () => {
      const response = await API.get(
        `/customer/get-customer-by-id/${customerId}`
      );
      setCustomerData(response.data);
    };
    fetchCustomerData();
  }, [customerId]);

  

  return (
    <div className="customer-insert" style={{ height: "100%", width: "100%" }}>
      <div className="top">
        <h2 className="h2">{props.title}</h2>
      </div>
      <div className="customer-form">
        <form>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Customer Id
            </label>
            <input
              type="text"
              value={customerData.customerId}
              id="disabledTextInput"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Customer name
            </label>
            <input
              type="text"
               value={customerData.customerName}
              id="disabledTextInput"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Customer address
            </label>
            <input
              type="text"
              value={customerData.customerAddress}
              id="disabledTextInput"
              className="form-control"
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
              value={customerData.mobileNumber}
              id="mobile_number"
              className="form-control"
              name="mobile_number"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={customerData.email}
              className="form-control"
              id="email"
              name="email"
              required
            />
          </div>

          <button className="btn btn-primary">{props.btnvalue}</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
