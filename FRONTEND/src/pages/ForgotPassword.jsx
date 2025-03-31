import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const {backendurl}=useContext(AppContext)
  const navigate=useNavigate()
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit =async () => {
    if (!email) {
      toast.error("please enter email")
    } else {
      // Handle sending OTP logic here (call an API or other logic)
      const data=await axios.post(backendurl + "/api/user/userforgotpassword",{email})

      try {
        if(data.data.success){
            toast.success(data.data.message)
            console.log("OTP sent to", email)
            navigate("/enterotp", { state: { email: email } })
          }else{
            toast.error(data.data.message);
          }
      } catch (error) {
        toast.error(error.message)
      }
      
    }
  }

  return (
    <div className="flex justify-center mt-4 items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" style={{ marginTop: '-10%' }}>
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Forgot Password</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <p className="text-gray-600 text-center mb-4">Please click the button below to send an OTP to your email</p>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-900 transition duration-300"
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
