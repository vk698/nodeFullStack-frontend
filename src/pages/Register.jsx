import React, { useState } from "react";
import axiosInstance from "../AxiosInstance";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [sucess,setSucess]=useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword]= useState("");
  const [error,setError]=useState("");
    const handleRegister = async(e)=>{
      e.preventDefault();
      console.log("value",email,password)
      try {
        const res= await axiosInstance.post("/auth/register",
          {
            email,
            password
          }
        )
          
        console.log("register",res)
         
        if(res.status===201){
          setTimeout(()=>{
           navigate("/login")
          },1000);
               setSucess("Registered sucessfully")
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
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        src="/images/spidey.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-0 left-[50%] h-full w-[50%] object-contain object-bottom-right scale-x-[1]"
      />

      <div className="min-h-screen flex items-center justify-center bg-black ">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-red-500/30 bg-black/30 p-8 text-white backdrop-blur-2xl shadow-[60px_60px_60px_rgba(220,38,38,0.35)]">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-5  ">
            <div>
              <label className="mb-2 block font-medium">Email:</label>

              <input
              value={email}
               onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Password:</label>

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

            <button
              type="submit"
              className="w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-gray-800"
            >
              Register
            </button>
             <div className="text-blue-400 text-2xl ">
            {sucess}
          </div>
            
            <p>Already registered?<Link to="/login">Login</Link> </p>
            
          </form>
        </div>
      </div>
    </div>
  );
}
