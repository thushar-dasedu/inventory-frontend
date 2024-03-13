import React, { useState } from "react";
import "./Registration.css";
import user from "../asset/person.png";
import email from "../asset/email.png";
import password from "../asset/password.png";
import address from '../asset/address-removebg-preview.png'
const Registration = () => {
    const [log ,setLog]=useState(false)
    const [heading ,setHeading]=useState("Sign In");

    const signUp=()=>{
        setLog(true)
        setHeading('sign Up')
    }
    const signIn=()=>{
        setLog(false)
        setHeading('Sign In')

        
    }
  return (
    <div className="registration-main">
      <div className="login">
        <div className="heading">
          <h3>
            {heading}
          </h3>
         {log===true&&(<>
            <div className="user-name">
            <img src={user} alt="" />
            <input type="text" placeholder="user name"/>
          </div>
          <div className="user-name">
            <img src={address} alt="" className="address" />
            <input type="text" placeholder="address"/>
          </div>
          <div className="user-name">
          <i class="ri-smartphone-line"></i>
          
          <input type="number" placeholder="mobile number"/>
          </div></>)} 
         
          <div className="user-name">
            <img src={email} alt="" />
            <input type="email" placeholder="email address"/>
          </div>
          <div className="user-name">
            <img src={password} alt="" />
            <input type="password" placeholder="password"/>
          </div>
          <div className="submit-btn">
            <button className="submit-form" onClick={signIn}>Sign in</button>
            <button className="submit-form"  onClick={signUp}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
