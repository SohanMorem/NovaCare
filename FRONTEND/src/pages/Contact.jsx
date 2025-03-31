import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const Contact = () => {
  // State to manage form data and errors

  const {backendurl,token}=useContext(AppContext)

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [message,setMessage]=useState("")

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = "User Name is required";
    }
    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/.test(email)) {
      formErrors.email = 'Enter a valid Gmail address and 5 letters long.';
    }

    if (!phone.trim()) {
      formErrors.phone = "Phone number is required";
    } else if (!/^\d{10}/.test(phone)) {
      formErrors.phone = "Enter a valid phone number.";
    }
    if (!message.trim()) {
      formErrors.message = "Message is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;  // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        const {data} = await axios.post(backendurl+"/api/user/usercontact",{username,email,phone,message},{headers:{token}})
        if(data.success){
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
    setUsername("")
    setEmail("")
    setPhone("")
    setMessage("")
      setErrors({});
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const { data } = await axios.post(`${backendurl}/api/user/sendhello`);
  //     console.log(data);
  
  //     if (data?.success) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data?.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  

  // const usercontact= async ()=>{
  //   const {data} = await axios.post(backendurl+"/api/user/usercontact",{username,email,phone,message})
  //   if(data.success){
  //     toast.success(data.message)
  //   }
  // }

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen mb-[8.5rem] bg-gray-100 p-4">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <img
          src={assets.contact_image}
          alt="Hospital Contact"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-black rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Contact Us</h2>
        <form  className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              rows="4"
              placeholder="Enter your message"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
