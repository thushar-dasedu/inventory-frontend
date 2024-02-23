import React, { useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

const AddProductBrand = () => {
  const data = {
    brandName: "",
    containSerialNumber: true
  };
  const [inputData, setInputData] = useState(data);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleData = (e) => {
    const { name, value } = e.target;
    console.log("name:", name);
    console.log("value:", value);
    const updatedValue = name === "containSerialNumber" ? value === "yes" : value;
    setInputData({ ...inputData, [name]: updatedValue });
  };
 
  const submitData = async (e) => {
    e.preventDefault();
    console.log("inputData:", inputData);
    if (!inputData.brandName || inputData.containSerialNumber === null) {
      setErrorMessage("Please fill all fields");
      return;
    }

    try {
      const response = await API.post('/product/add-product-brand', inputData);
      console.log(response.data);
      navigate('/product');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <div>
        <h2 className="h2">Add Product Brand</h2>
      </div>
      <div className="customer-form">
        <form action="">
          <div className="mb-3">
            <label htmlFor="brandName" className="form-label">
              BrandName
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name="brandName"
              value={inputData.brandName}
              onChange={handleData}
              placeholder="enter brand name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="containSerialNumber" className="form-label">
              Product contain serial Number
            </label>
            <select
              id="disabledSelect"
              className="form-select"
              name="containSerialNumber"
              value={inputData.containSerialNumber ? "yes" : "no"}
              onChange={handleData}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={submitData}>
            Save
          </button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddProductBrand;
