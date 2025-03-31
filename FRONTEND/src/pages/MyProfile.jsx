import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const MyProfile = () => {

  // const [userData, setUserData] = useState({
  //   name: "Sohan Morem",
  //   image: assets.profile_pic,
  //   email: 'sohanmorem@gmail.com',
  //   phone: '+91 1234567890',
  //   address: {
  //     line1: "udhna darwaja ",
  //     line2: "surat",
  //   },
  //   gender: "Male",
  //   dob: "2004-08-23"
  // })

    const {userData,setUserData,token,loadUserData,backendurl}=useContext(AppContext)

  const [isEdit, setIsedit] = useState(false)
  const [image,setImage]=useState(false)

  const updateUserData=async ()=>{
    
    try {

      const formData=new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('dob',userData.dob)
      formData.append('gender',userData.gender)
      formData.append('address',JSON.stringify(userData.address))

      image && formData.append('image',image)



      // const payload = {
      //   name: userData.name,
      //   phone: userData.phone,
      //   dob: userData.dob,
      //   gender: userData.gender,
      //   address: JSON.stringify(userData.address), // Use the plain object, no need for JSON.stringify
      // };

      // if (image){
      //   payload.image=image;
      // }

    

      // const {data}=await axios.post(backendurl + '/api/user/updateUserDetail',payload,{headers:{token},'Content-Type': 'application/json',})

      const {data}=await axios.post(backendurl + '/api/user/updateUserDetail',formData,{headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserData()
        setIsedit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  return userData && (
    
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-32 h-20 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? "" : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="image" id="image" hidden />
          </label>
        :<img className='w-36 rounded' src={userData.image} alt="" />

      }
      

      {
        isEdit
          ? <input className='bg-gray-300 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e=>setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-black mt-4' >{userData.name}</p>
      }

      <hr className='bg-black h-[1px] border-none' />

      <div>
        <p className='text-black underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
            ? <input className='bg-gray-100 max-w-52 ' type="text" value={userData.phone} onChange={(e)=>setUserData(prev => ({ ...prev, phone: e.target.value }))} />
            : <p className='text-blue-500'>{userData.phone}</p>
          }
          
          <p className='font-medium'>Address</p>
          {
            isEdit
            ? <p> <input type="text" className='bg-gray-100 max-w-52 ' value={userData.address.line1} onChange={(e)=>setUserData((prev) => ({...prev,address:{...prev.address, line1:e.target.value},}))} />
              <br />
                  <input type="text" className='bg-gray-100 max-w-52 ' value={userData.address.line2}onChange={(e)=>setUserData((prev) => ({...prev,address:{...prev.address, line2:e.target.value},}))} />
            </p>
            : <p className='text-black'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>

      <div>
        <p className='text-black underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit
          ? <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          : <p className='text-black'>{userData.gender}</p>
          }
          <p className='font-medium'>Birth Date:</p>
          {
            isEdit
            ? <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e)=>setUserData(prev => ({ ...prev, dob: e.target.value }))} />
            : <p className='text-black'>{userData.dob}</p>
          }
        </div>
      </div>
      <div>
        {
          isEdit
          ? <button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all mb-10' onClick={updateUserData}>Save Information</button>
          : <button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all mb-10' onClick={()=>setIsedit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
