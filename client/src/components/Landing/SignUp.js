import React, { useState } from 'react';
import NavBar from '../../NavBar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function register(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:5555/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          Swal.fire({
            icon: 'success',
            title: 'Your account has been created successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => navigate('/login'), 1500);
        }
      });
  }

  return (
    <div>
      <NavBar />
      <div className='compheading'>Signup</div>
      <form className="form" onSubmit={register}>
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
          <label>Confirm Password</label>
        </div>
        <div className="inputForm">
          <input
            type='password'
            name="password_confirmation"
            className="input"
            placeholder="Confirm your Password"
            value={formData.password_confirmation}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputForm">
        </div>
        <button className="button-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
