import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContextProvider";
import { AppContext } from "../context/AppContextProvider";
import {toast} from "react-toastify"
import axios from 'axios'

const AddDoctor = () => {

  const [docImage,setDocImage]=useState(false)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [experience,setExperience]=useState("1 Year")
  const [speciality,setSpeciality]=useState("General physician")
  const [fees,setFees]=useState("")
  const [degree,setDegree]=useState("")
  const [about,setAbout]=useState("")
  const [address1,setAddress1]=useState("")
  const [address2,setAddress2]=useState("")

  const {atoken}=useContext(AdminContext)
  const {backendurl}=useContext(AppContext)

  const SubmitHandle=async (e)=>{
    e.preventDefault()
    try {
      if(!docImage){
       return toast.error("Image is not Selected")
      }
        const formData=new FormData()

        formData.append("image",docImage)
        formData.append("name",name)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("speciality",speciality)
        formData.append("experience",experience)
        formData.append("fees",fees)
        formData.append("about",about)
        formData.append("degree",degree)
        formData.append("address",JSON.stringify({line1:address1,line2:address2}))

        formData.forEach((value,key)=>{
          console.log(`${key} : ${value}`)
        })

        const {data}= await axios.post(backendurl+ '/api/admin/addDoctor',formData,{headers:{atoken}})

        if(data.success){
          toast.success(data.message)
          setDocImage(false)
          setName("")
          setEmail("")
          setPassword("")
          setSpeciality("General physician")
          setAbout("")
          setExperience("! Year")
          setFees("")
          setAddress1("")
          setAddress2("")
          setDegree("")
        }else{
          toast.error(data.message)
        }

      
    } catch (error) {
      console.log("error")
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md w-full">
      <p className="mb-3 text-lg font-medium text-center">Add Doctor</p>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-6">
        <label htmlFor="image">
          <img src={ docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" className="w-16 bg-gray-100 rounded-full cursor-pointer"  />
        </label>
        <input type="file" name="image" id="image" onChange={(e)=>setDocImage(e.target.files[0])} hidden />
        <p>Upload Doctor Image</p>
      </div>
      <form onSubmit={SubmitHandle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Doctor name</label>
          <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Speciality</label>
          <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Doctor Email</label>
          <input type="email" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Your email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Degree</label>
          <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Education" onChange={(e)=>setDegree(e.target.value)} value={degree}/>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Doctor Password</label>
          <input type="password" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Address</label>
          <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Address 1" onChange={(e)=>setAddress1(e.target.value)} value={address1}/>
          <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mt-2" placeholder="Address 2" onChange={(e)=>setAddress2(e.target.value)} value={address2}/>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Experience</label>
          <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" onChange={(e)=>setExperience(e.target.value)} value={experience}>
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
            <option value="4 Year">4 Year</option>
            <option value="5 Year">5 Year</option>
            <option value="6 Year">6 Year</option>
            <option value="7 Year">7 Year</option>
            <option value="8 Year">8 Year</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Fees</label>
          <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Your fees" onChange={(e)=>setFees(e.target.value)} value={fees}/>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-gray-600 text-sm mb-1">About Dcotor</label>
          <textarea className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Write about yourself" rows="4" onChange={(e)=>setAbout(e.target.value)} value={about}></textarea>
        </div>
        <div className="sm:col-span-2">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Add doctor</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
