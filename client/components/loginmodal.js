"use client";
import React, { useState } from "react";
import { Login, Register } from "@/modules/fetch/user";
import Cookies from "js-cookie";

export default function LoginModal({ visible, onClose }) {
  const [loginView, setLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setLoginView(!loginView);
  };

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) {
    return null;
  }

  const handleChange = (e) => {
    if (loginView) {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    } else {
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await Login(loginData);
      const token = response.headers.get("Authorization");
      if (token) {
        Cookies.set("Authorization", token);
        console.log("Token set:", token);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await Register(registerData);
      console.log(response);
      onClose()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="container"
      className="w-full h-full backdrop-blur-md bg-black/10 flex place-content-center z-50 fixed"
      onClick={handleOnClose}
    >
      <div className="w-1/3 h-4/6 bg-white self-center rounded-2xl -mt-24 max-sm:w-2/3 max-md:w-2/3">
        {loginView ? (
          <div className="flex justify-center h-full">
            <div className="grid grid-cols-1 place-content-center">
              <h1 className="text-2xl text-center mb-4 font-bold">Login</h1>
              <form className="grid grid-cols-1 gap-4 mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e)}
                    className="w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Password:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e)}
                    className=" w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-600">Show Password</label>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-primary text-white py-2 rounded-3xl hover:bg-secondary hover:scale-105 duration-300"
                >
                  Login
                </button>
              </form>
              <div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="text-primary font-medium ml-1"
                  >
                    Register now!
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
            <div className="flex justify-center h-full">
            <div className="grid grid-cols-1 place-content-center">
              <h1 className="text-2xl text-center mb-4 font-bold">Register</h1>
              <form className="grid grid-cols-1 gap-4 mt-4">
              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={(e) => handleChange(e)}
                    className="w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={registerData.email}
                    onChange={(e) => handleChange(e)}
                    className="w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={(e) => handleChange(e)}
                  className="w-full border rounded-md py-2 px-3 text-sm"
                />
              </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Confirm Password:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    // value={registerData.password}
                    // onChange={(e) => handleChange(e)}
                    className="w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-600">Show Password</label>
                </div>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full bg-primary text-white py-2 rounded-3xl hover:bg-secondary hover:scale-105 duration-300"
                >
                  Register Now!
                </button>
              </form>
              <div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="text-primary font-medium ml-1"
                  >
                    Click here to Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
