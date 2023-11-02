import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the form fields to it
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    formDataToSend.append('role', formData.role);

    try {
      const response = await axios.post('/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to form data
        },
        
      });

      console.log(response.data); // Log the response data
      // Handle the response, e.g., show a success message or redirect to the dashboard.
    } catch (error) {
      console.error('Error:', error); // Log the error
      // Handle errors, e.g., display an error message to the user.
    }
  };
  const handleGetRequest = async () => {
    try {
      const response = await axios.get('/signup');  // Replace '/api/endpoint' with your actual endpoint
      console.log(response.data); // Log the response data
      // Handle the response, e.g., update your component's state with the received data.
    } catch (error) {
      console.error('Error:', error); // Log the error
      // Handle errors, e.g., display an error message to the user.
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
      <div className='compheading'>Signup</div>
      <button onClick={handleGetRequest}>Fetch Data</button>
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
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="button-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
