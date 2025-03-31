import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [newpassword,setnewpassword]=useState("")
    const {backendurl}=useContext(AppContext)
    const location=useLocation()
    const email=location.state?.email
    const navigate=useNavigate()

    const handleSubmit=async()=>{
        if(!newpassword){
            toast.error("please enter new password")
        }else if(newpassword.length < 8){
            toast.error("Enter a strong password")
        }else{
            const data= await axios.post(backendurl+"/api/user/userupdatepassword",{email,newpassword})
            try {
                if(data.data.success){
                    toast.success(data.data.message)
                    navigate("/")
                }else{
                    toast.error(data.data.message)
                }
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Reset Password
        </h1>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newpassword}
            onChange={(e)=>setnewpassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>



        <div className="flex justify-center">
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
