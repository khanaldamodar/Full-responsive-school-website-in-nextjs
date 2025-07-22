"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // import Cookies from "js-cookie";

  // Inside your component
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const existingToken = Cookies.get("token");

    if (existingToken) {
      alert("You are already logged in.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });


      const token = response.data.token;

      if (token) {
        Cookies.set("token", token, { expires: 1 }); // store token for 7 days
        alert("Login successful!");

        // Optional: store user info if needed
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect
        window.location.href = "/admin/dashboard";
      } else {
        alert("Login failed. Token not received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-0 font-poppins">
      <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter your password"
            />
          </div> 

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login;
