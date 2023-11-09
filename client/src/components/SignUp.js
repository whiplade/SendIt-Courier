import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user", // Set the default role to "user"
  });

  const [errors, setErrors] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function register(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/signup", {
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
            title: "Your account has been created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setErrors(data.errors);
        }
      });
  }

  return (
    <div>
      <section className="bg-slate-300">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-lg shadow-slate-900 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-3 sm:p-8">
              <div className="flex justify-between">
                <FaTruck className="text-indigo-500 text-3xl" />
                <h1 className="text-xl font-bold font-serif">Sign Up</h1>
              </div>
              <form onSubmit={register} className="space-y-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  {errors.email &&
                    errors.email.map((error, index) => {
                      return (
                        <p key={index} className="text-xs text-red-600">
                          {error}!
                        </p>
                      );
                    })}
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  {errors.username &&
                    errors.username.map((error, index) => {
                      return (
                        <p key={index} className="text-xs text-red-600">
                          {error}!
                        </p>
                      );
                    })}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  {errors.password &&
                    errors.password.map((error, index) => {
                      return (
                        <p key={index} className="text-xs text-red-600">
                          {error}!
                        </p>
                      );
                    })}
                </div>
                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  {errors.password_confirmation && (
                    <span className="text-xs text-red-600">
                      {errors.password_confirmation[0]}!
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 font-bold font-serif text-gray-800 p-2 rounded-sm"
                >
                  Sign Up
                </button>
              </form>
              <div className="text-right">
                <Link to="/login" className="text-xs underline text-bold">
                  Or login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
