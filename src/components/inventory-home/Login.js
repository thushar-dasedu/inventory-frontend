import React, { useState } from 'react';

import {  useNavigate } from 'react-router-dom';
import API from '../../axios';

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/customer/authenticate', {
        email: inputData.email,
        password: inputData.password
      });
      const { data } = response; // Destructure `data` from the response
      const { token } = data; // Destructure `token` from `data`
  
      // Store the token in local storage or session storage
      localStorage.setItem('token', token);
      localStorage.setItem('inputData', JSON.stringify(inputData));
      // Redirect or navigate to another page upon successful login
      navigate('/'); // Replace '/dashboard' with your desired route
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., display error message to user)
    }
  }

  return (
    <div className="registration-main">
      <div className="login">
        <form className="heading">
          <div className="user-name">
            <img src={inputData.email} alt="" />
            <input type="email" placeholder="email address" name="email" value={inputData.email} onChange={handleInput} />
          </div>
          <div className="user-name">
            <img src={inputData.password} alt="" />
            <input type="password" placeholder="password" name="password" value={inputData.password} onChange={handleInput} />
          </div>
          <div className="submit-btns">
            <button className="submit-form" onClick={submitData}>Sign in</button>
            {/* Add a link/button for registration */}
            <button className="submit-form" onClick={() => navigate('/registration')}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
