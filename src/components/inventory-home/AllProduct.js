import React, { useEffect, useState } from 'react'
import API from "../../axios" 
import { getImage } from '../../axios';
import './AllProduct.css'
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
const AllProduct = () => {
    const [productData,setProductData]=useState([])
    const getProduct=async()=>{
        const response=await API.get("/pro-model/images");
         setProductData(response.data);
    }
    useEffect(()=>{
      getProduct();
    },[])
  return (
    <>
    <h1>Product Lists</h1>
    
    <div className='product-container'>
      

        {
            productData.map((item)=>{
                return(
                    //  <div className="product-container">
                    <Link to={`/single-page/${item.modelId}`}>
                    <div className="product-list" key={item.modelId}>
                <div className="product-header">
                    <h4>{item.brandName}</h4>
                </div>
                <div className="product-image">
                    <img src={getImage(item.name)} alt="" />
                </div>
                <div className="product-model">
                    <p>{item.productModelName}</p>
                </div>
                <div className="product-price">
                    <span><FaRupeeSign />{item.unitPrice}</span>
                </div>
                </div>
                </Link>
            //  </div>
            )
               
            })
        }
        
    </div>
    </>
  )
}

export default AllProduct