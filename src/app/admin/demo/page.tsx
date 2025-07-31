"use client"
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const page = () => {

    
    const fetchAdmissions = async () => {
        try {
            const token = Cookies.get("token");
            console.log("Token:", token);
          const res = await axios.get("http://127.0.0.1:8000/api/admission", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          console.log("Fetched admissions:", res.data);
        } catch (err) {
          console.error("Failed to fetch admissions", err);
        }
      };
    
      useEffect(() => {
        fetchAdmissions();
      }, []);
  return (
    <div>page</div>
  )
}

export default page