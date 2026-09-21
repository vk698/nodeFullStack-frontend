import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../AxiosInstance";
import { Link, useNavigate,  } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
 const [error,setError]= useState("");
 const [sucess,setSucess]=useState("")
 console.log(error)
  const handleLogin = async (e)=>{
    
    e.preventDefault();
   
    try {
      const res = await axiosInstance.post("/auth/login",{
        email,
        password
      })
      console.log("login",res.data);
      
 if(res.status===200){
       
  
         setTimeout(()=>{
          navigate("/")
         },1000)
          setSucess("login Sucessfully")
        }
      
    } catch (error) {
        if(error.response?.data){
          setError(error.response?.data)

        }
        
        console.log("Error:", error);
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
        
      }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg- black">

     <video
       src="/images/spidey.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-0 left-[-22%] h-full w-[50%] object-contain object-bottom-left scale-x-[-1]"
     
     
     />

    <div className="min-h-screen flex items-center justify-center bg-black z-2">

      <div className="w-full max-w-md rounded-2xl font-serif bg-linear-to-b from-blue-80% to-red-500 bg-white p-8 shadow-xl z-1">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Welcome Back 
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            
            <label className="mb-2  font-medium">
              Email
            </label>

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2  font-medium">
              Password
            </label>

            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
          {
           error.message
            
          }
          <div className="text-blue-400 text-2xl ">
            {sucess}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-gray-800"
          >
            Login
          </button>
          <p className="text-2xl">Create new account.<Link to="/register"><span className="text-blue-400 hover:underline ml-5">Register</span></Link></p>

        </form>

      </div>
      </div>

    </div>
  );
}