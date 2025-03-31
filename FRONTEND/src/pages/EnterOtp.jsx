import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const EnterOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const {backendurl}=useContext(AppContext)

  const location =useLocation()
  const newemail=location.state?.email

  const email=newemail

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit =async () => {

    console.log(email)
    if (!email) {
        toast.error("Email is missing. Please try again.");
        return;
      }
    if (!otp) {
      toast.error("please enter otp")
    } else {
      // Handle OTP validation logic here (e.g., call an API)

      const data=await axios.post(backendurl+"/api/user/userverifyotp",{email,otp})
      try {
        if(data.data.success){
            toast.success(data.data.message)
            console.log('OTP entered:', otp,email);
            navigate("/resetpassword",{state:{email:email}})
        }else{
            toast.error(data.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
      
    }
  };

  const handleResendOtp=async ()=>{

    if (!email) {
        toast.error("Email is missing. Please try again.");
        return;
      }
   
        // Handle OTP validation logic here (e.g., call an API)
        console.log("resend email:"+email)
        const data=await axios.post(backendurl+"/api/user/userresendotp",{email})
        try {
          if(data.data.success){
              toast.success(data.data.message)
              console.log('otp sent to',+email)
          }else{
              toast.error(data.data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
        
      
  

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" style={{ marginTop: "-10%" }}>
    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Enter OTP</h1>
    <div className="mb-4">
      <label htmlFor="otp" className="block text-gray-600 mb-2">OTP:</label>
      <input
        type="text"
        name="otp"
        id="otp"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter the OTP sent to your email"
        value={otp}
        onChange={handleOtpChange}
      />
    </div>
    <div className="flex justify-center">
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300"
      >
        Submit OTP
      </button>
    </div>
    <div className="mt-4 text-center">
      <button
        onClick={handleResendOtp} // Define this function to handle resend logic
        className="text-blue-500 hover:text-blue-600"
      >
        Resend OTP
      </button>
    </div>
  </div>
</div>
  )
}


export default EnterOtp;

