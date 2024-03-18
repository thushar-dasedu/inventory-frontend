import React, { useState } from 'react'
import "./Registration.css";
import email from "../asset/email.png";
import password from "../asset/password.png";
import { useNavigate } from 'react-router-dom';
import API from '../../axios';

const Login = ({setAdminLog}) => {
  const navigate=useNavigate();
  const [inputData,setInputData]=useState({
    email:"",
    password:"",
  });

  const handleClick=(e)=>{
    e.preventDefault();
     navigate("/registration")
  }
  const handleInput=(e)=>{
    setInputData({...inputData,[e.target.name]:e.target.value})

  }

  const login=async()=>{
    try{
      const response=await API.post('/customer/login',inputData,{
        headers:{
          'Authorization': 'basic '+ btoa('smith:smith123')
        }
      });
      console.log(response.data);
      navigate('/')
      setAdminLog(true)
    }catch(error){
      console.log(error.response.data.message)
    }
     
  }
  const submitData=(e)=>{
    e.preventDefault();
    login();

  }
  return (
    <div className="registration-main">
      <div className="login">
       
        <form className="heading"  >
       
       
          <h3>
            Login
          </h3>
          
         
            
         
          <div className="user-name">
            <img src={email} alt="" />
            <input type="email" placeholder="email address" name="email"  value={inputData.email} onChange={handleInput}/>
          </div>
          <div className="user-name">
            <img src={password} alt="" />
            <input type="password" placeholder="password" name="password"  value={inputData.password} onChange={handleInput}/>
          </div>
          <div className="submit-btns">
            <button className="submit-form" onClick={submitData}>Sign in</button>
            <button className="submit-form"   onClick={handleClick}>Sign up</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login