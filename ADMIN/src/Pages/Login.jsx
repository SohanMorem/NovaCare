import React, { useContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import { AppContext } from "../context/AppContextProvider";
import { AdminContext } from "../context/AdminContextProvider";
import { DoctorContext } from "../context/DoctorContextProvider";

const Login = () => {
  const {backendurl}=useContext(AppContext)
  const {setAtoken}=useContext(AdminContext)
  const {setDtoken}=useContext(DoctorContext)
  const [login, setLogin] = useState("Admin");
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleLogin=async (e)=>{
    e.preventDefault();
    try {
      if(login === "Admin"){
        const {data}=await axios.post(backendurl+"/api/admin/adminLogin",{email,password})
        if (data.success){
          localStorage.setItem('atoken',data.atoken)
          setAtoken(data.atoken)
          console.log(backendurl,data.atoken)
        }
        else {
          toast.error(data.message)
        }
        }else{
          const {data}=await axios.post(backendurl+"/api/doctor/doctorlogin",{email,password})
          if (data.success){
            localStorage.setItem('dtoken',data.dtoken)
            setDtoken(data.dtoken)
            console.log(backendurl,data.dtoken)
          }
          else {
            toast.error(data.message)
          }
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4"><span className="text-blue-700">{login}</span> Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Login</button>
          {
            login==="Admin"?
            <div className="text-center">
            <p>For Doctor login <a href="#" onClick={()=>setLogin("Doctor")} className="text-sm text-blue-500 hover:underline">Click Here</a>
            </p>
          </div>:
          <div className="text-center">
          <p>For Admin login <a href="#" onClick={()=>setLogin("Admin")} className="text-sm text-blue-500 hover:underline">Click Here</a>
          </p>
        </div>
          }
        </form>
      </div>
    </div>
  );
};

export default Login;
