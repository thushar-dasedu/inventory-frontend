import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../axios';

const ProductModelInsertion = () => {
    const {productId}=useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [productData , setProductData]=useState({
        productId:"",
        brandName:"",
        containSerialNumber:""
    
    });
    const data={
        productId:"",
        productModelName:"",
        unitPrice:"",
        tax:"",
        quantity:""
    }
    const [modelData,setModelData]=useState(data);
    

    useEffect(()=>{
        const fetchData=async()=>{
        const response=await API.get(`/product/get-product-by/${productId}`);
        setProductData(response.data);
        }
        fetchData();
    },[productId]);

    const handleData=(e)=>{
        setModelData({...modelData,[e.target.name]:e.target.value});
    }
  const submitData=async(e)=>{
    e.preventDefault();
    try{
        const response=await API.post('/pro-model/add-product-model',modelData);
        console.log(response.data);

    }catch(error){
        setErrorMessage(error.response.data.message);
    }

  }

  return (
    <div><div>
    <h2 className="h2">Add Product Brand</h2>
  </div>

       
        <div className="customer-form">
        <form>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
             product Id
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='productId'
              value={productData.productId}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
            Brand Name
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='brandName'
              value={productData.brandName}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
            Model Name
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              name='poductModelName'
              value={modelData.productModelName}
              onChange={handleData} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
             Unit Price
            </label>
            <input
              type="number"
              id="disabledTextInput"
              className="form-control"
              name='unitPrice'
               value={modelData.unitPrice}
               onChange={handleData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
            Tax
            </label>
            <input
              type="number" step="0.01"
              id="disabledTextInput"
              className="form-control"
              name='tax'
              value={modelData.tax}
              onChange={handleData} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">
            Quantity
            </label>
            <input
              type="number" step="0.01"
              id="disabledTextInput"
              className="form-control"
              name='quantity'
              value={modelData.quantity}
              onChange={handleData} 
            />
          </div>
          <button className="btn btn-primary" onClick={submitData}>
           Save
          </button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
        </div>
        
    </div>
  )
}

export default ProductModelInsertion