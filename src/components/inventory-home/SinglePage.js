import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../axios';

const SinglePage = () => {
const {modelId} =useParams();
const [inputData,setInputData]=useState({
    modelId:"",
    brandId:"",
    productModelName:"",
    unitPrice:"",
    tax:""
});

const getSingleProduct=async()=>{
 const response=   await API.get(`/pro-model/get-by/${modelId}`);
 console.log(response.data) 
 
  setInputData(response.data);
}




useEffect(()=>{
    getSingleProduct();
 },[])

  return (
    <div>
        <div className="imgae">
            <img src="tuf.png" alt="asus" />
        </div>
        <button>add to cart</button>
        <button>buy now</button>
        <div className="product-info">
            <div className="brand">
                <h1>{inputData.productModelName}</h1>
            </div>
        </div>
        </div>
  )
}

export default SinglePage