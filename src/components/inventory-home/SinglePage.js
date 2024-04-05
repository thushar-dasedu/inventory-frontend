import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../axios';
import './SinglePage.css'
import { FaCartShopping } from "react-icons/fa6";
import { ImPower } from "react-icons/im";
import { Link } from 'react-router-dom';
     


const SinglePage = () => {
const {modelId} =useParams();



const [inputData,setInputData]=useState(
    []
);



const getSingleProduct=async()=>{
 const response=   await API.get(`/pro-model/view-products/${modelId}`);
 console.log(response.data) 
 
  setInputData(response.data);
}



useEffect(()=>{
    getSingleProduct();
 },[])

  return (
    <div className='single-container'>
       {
        inputData.map(({brandName,productModelName,unitPrice,name,type})=>{
            return(
                <>
                <div className="product-img">
                <div className="imgae">
                    <img src={`http://localhost:8080/pro-model/fileSystem/${name}`} alt={type} />
                </div>
                <div className="buttons">
              <Link to="/cart-page"><button className='add-cart'><FaCartShopping />
        add to cart</button></Link>  
                <button className='buy'><ImPower />
        buy now</button>
                </div>
                </div>
                <div className="product-info">
        
                    <div className="brand">
                        <h1>brand name : {brandName}</h1>
                        <h3>model name : {productModelName}</h3>
                    </div>
                    <div className="discription">
                        <b>Discription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque error iste eum iusto, cumque sapiente animi alias velit voluptatibus sit sint rem similique nobis explicabo aut? Asperiores ducimus error vitae accusamus alias fugit similique minus nostrum illum, optio quasi aspernatur dolore assumenda dolorum inventore placeat deserunt et quod amet sit. Eligendi ipsum deleniti id illo quos neque quaerat nam unde odio doloribus aliquid, voluptatem commodi atque nesciunt repellat rerum magni reprehenderit? Modi sit amet adipisci quasi saepe animi cupiditate sint atque rerum asperiores assumenda voluptatum, dolor reiciendis natus aliquam pariatur deleniti quaerat ullam, veritatis nam vel ipsam nemo? Dignissimos, velit.</b>
                    </div>
                    <div className="price">
                        <p><b>PRICE : {unitPrice}</b></p>
                    </div>
        
                </div>
                </>   
            )
        })
       }
       

        </div>
  )
}

export default SinglePage    