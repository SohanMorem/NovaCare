import React, { useContext } from 'react'
import { AdminContext } from "../context/AdminContextProvider";
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContextProvider';

const Slidebar = () => {

  const {atoken}=useContext(AdminContext)
  const {dtoken}=useContext(DoctorContext)


  return (
    <div className='min-h-screen bg-white border-r'>
      {
        atoken && <ul className='text-[#515151] mt-5'>
          <NavLink to={'/adminDashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer bg-[#F2F3FF] border-r-4 border-blue-600 ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""}`} onClick={()=>scrollTo(0,0)}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={'/allAppointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""}`} onClick={()=>scrollTo(0,0)}>
            <img src={assets.appointment_icon} alt="" />
            <p>All Appointments</p>
          </NavLink>
          <NavLink to={"/addDoctor"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600 text-black" : ""}`} onClick={()=>scrollTo(0,0)}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink to={"/ListDoctor"}className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""}`} onClick={()=>scrollTo(0,0)}>
            <img src={assets.people_icon} alt="" />
            <p>List Doctor</p>
          </NavLink>

        </ul>
      }
      { 
        dtoken && <ul className='text-[#515151] mt-5'>
        <NavLink to={'/doctorDashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""}`} onClick={()=>scrollTo(0,0)}>
          <img src={assets.home_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to={'/Appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""}`} onClick={()=>scrollTo(0,0)}>
          <img src={assets.appointment_icon} alt="" />
          <p>Appointments</p>
        </NavLink>
        <NavLink to={'/profile'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""}`} onClick={()=>scrollTo(0,0)}>
          <img src={assets.people_icon} alt="" />
          <p>Profile Page</p>
        </NavLink>
        </ul>
      }
    </div>
  )
}

export default Slidebar
