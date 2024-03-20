import React, { useEffect, useState } from "react";
import API from "../axios";
import { useParams  ,useNavigate} from "react-router-dom";
 


const UpdateCustomer = (props) => {
   const navigate=useNavigate();
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState({
    customerId: "",
    customerName: "",
    customerAddress: "",
    mobileNumber: "",
    email: ""
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await API.get(
          `/customer/get-customer-by-id/${customerId}`
        ,{
          headers:{
            'Authorization': 'basic '+ btoa('smith:smith123')
          }
        });
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomerData();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(
        `/customer/update-customer-by/${customerId}`,
        customerData,{
          headers:{
            'Authorization': 'basic '+ btoa('smith:smith123')
          }
        }
      );
       console.log(response.data);
        navigate('/customer-info');
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="customer-insert" style={{ height: "100%", width: "100%" }}>
      <div className="top">
        <h2 className="h2">{props.title}</h2>
      </div>
      <div className="customer-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="customerId" className="form-label">
              Customer Id
            </label>
            <input
              type="text"
              value={customerData.customerId}
              id="customerId"
              className="form-control"
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">
              Customer Name
            </label>
            <input
              type="text"
              value={customerData.customerName}
              id="customerName"
              className="form-control"
              name="customerName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="customerAddress" className="form-label">
              Customer Address
            </label>
            <input
              type="text"
              value={customerData.customerAddress}
              id="customerAddress"
              className="form-control"
              name="customerAddress"
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
              value={customerData.mobileNumber}
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
              value={customerData.email}
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
  );
};

export default UpdateCustomer;
