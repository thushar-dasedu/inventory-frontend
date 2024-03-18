import React, { useState } from "react";
import "./Registration.css";
import user from "../asset/person.png";
import email from "../asset/email.png";
import password from "../asset/password.png";
import address from '../asset/address-removebg-preview.png'
import API from "../../axios";
import { useNavigate } from "react-router-dom";
  const Registration = () => {

    const navigate=useNavigate();
     const [inputData,setInputData]=useState({
      customerName:"",
      customerAddress:"",
      mobileNumber:"",
      email:"",
      password:""
    })
    const handelInput=(e)=>{
      setInputData({...inputData,[e.target.name]:e.target.value})

    }
    const addUser=async()=>{
      try{
        const response=await API.post('/customer/add-customer',inputData,{
          headers: {
            'Authorization': 'Basic ' + btoa('smith:smith123')  
          }});
        console.log(response.data);
         navigate("/login")
      }catch(error){
        console.log(error.response.data)
      }
       
     }  
    const signUp=(e)=>{
      e.preventDefault();

      if(inputData.customerName===""&&inputData.email===""&&inputData.password===""){
       alert("Please fill all the fields")
       }
       addUser();
    }
    const signIn=(e)=>{
      e.preventDefault()
      navigate("/login")
       }

       
  return (
    <div className="registration-main">
      <div className="login">
       
        <form className="heading"  >
       
       
          <h3>
           Sign up
          </h3>
          
         
            <div className="user-name">
            <img src={user} alt="" />
            <input type="text" placeholder="user name" name="customerName" value={inputData.customerName} onChange={handelInput}/>
          </div>
          <div className="user-name">
            <img src={address} alt="" className="address" />
            <input type="text" placeholder="address" name="customerAddress" value={inputData.customerAddress} onChange={handelInput}/>
          </div>
          <div className="user-name">
          <i class="ri-smartphone-line"></i>
          
          <input type="number" placeholder="mobile number" name="mobileNumber" value={inputData.mobileNumber} onChange={handelInput}/>
          </div>  
         
          <div className="user-name">
            <img src={email} alt="" />
            <input type="email" placeholder="email address" name="email" value={inputData.email} onChange={handelInput}/>
          </div>
          <div className="user-name">
            <img src={password} alt="" />
            <input type="password" placeholder="password" name="password" value={inputData.password} onChange={handelInput}/>
          </div>
          <div className="submit-btns">
            <button className="submit-form" onClick={signIn}>Sign in</button>
            <button className="submit-form"  onClick={signUp}>Sign up</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Registration;
