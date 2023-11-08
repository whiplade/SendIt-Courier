import React, { useState} from 'react';
import axios from 'axios';
import NavBar from '../../NavBar'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const navigate = useNavigate(); 

  const useSignup = () => {
    navigate('/user/home');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);

    try {
      const response = await axios.post('/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        
      });

      console.log(response.data); 
    
    } catch (error) {
      console.error('Error:', error); 
    
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <NavBar />
      <div className='compheading'>Signup</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>UserName</label>
        </div>
        <div className="inputForm">
          <input
            type='text'
            name="username"
            className="input"
            placeholder="Enter your UserName"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input
            type='email'
            name="email"
            className="input"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input
            type='password'
            name="password"
            className="input"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-column">
          <label>ConfirmPassword</label>
        </div>
        <div className="inputForm">
          <input
            type='password'
            name="confirmPassword"
            className="input"
            placeholder="Confirm your Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputForm">
        </div>
        <button className="button-submit" onClick={useSignup}  type="submit">Sign Up</button>
      </form>
    </div>
  );
}
