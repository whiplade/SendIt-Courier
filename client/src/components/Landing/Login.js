import React, { useState } from 'react';
import NavBar from '../../NavBar';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your login was successful",
            showConfirmButton: false,
            timer: 1500,
          });
          if (!data.errors) {
            localStorage.setItem("access_token", data.access_token);
          }
          setTimeout(() => {
            if (data.user && data.user.role === "admin") {
              navigate("/AdminDashboard");
            } else {
              navigate("/");
            }
          }, 1500);
        }
      });
  };

  return (
    <div>
      <NavBar />
      <div className="compheading">Login</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex-row">
          <div>
            <label>Remember Me</label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button className="button-submit" type="submit">
          Login
        </button>

        <p className="p">Don't have an account? <Link to="/signup" className="span">Sign Up</Link></p>
        <p className="p line">Or With</p>

        <div className="flex-row">
          <button className="btn google">Google</button>
          <button className="btn apple">SendIt</button>
        </div>
      </form>
    </div>
  );
}
