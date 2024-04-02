import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../axios';
import './SinglePage.css'
import { FaCartShopping } from "react-icons/fa6";
import { ImPower } from "react-icons/im";
     


const SinglePage = () => {
const {modelId} =useParams();
const [images,setImages]=useState([]);



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

const getImages=async()=>{
    const response=await API.get("/pro-model/images");
     setImages(response.data);
}


useEffect(()=>{
    getSingleProduct();
    getImages();
 },[])

  return (
    <div className='single-container'>
        <div className="product-img">
        <div className="imgae">
            <img src="https://1.bp.blogspot.com/-U94NVGl_8-0/XzZ-h8z5L2I/AAAAAAAAJ8M/JYKlezQuYW0USS0TlrVDWJta4veHflJMACNcBGAsYHQ/s1500/HP-Pavilion+Gaming+15-ec1052AX-laptop.jpg" alt="asus" />
        </div>
        <div className="buttons">
        <button className='add-cart'><FaCartShopping />
add to cart</button>
        <button className='buy'><ImPower />
buy now</button>
        </div>
        </div>
        <div className="product-info">
            <div className="brand">
                <h1>{inputData.productModelName}</h1>
            </div>
            <div className="price">
                <p>{inputData.unitPrice}</p>
            </div>

        </div>
           <div>
            {images.map(({name,filePath})=>{
                return(

                    <div key={name}>
                        <p>{name}</p>
                        <img src= {`http://localhost:8080/pro-model/fileSystem/${name}`} alt={filePath} />
                    </div>
                )
            })}
           </div>

        </div>
  )
}

export default SinglePage