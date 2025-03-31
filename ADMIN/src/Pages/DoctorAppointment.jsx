import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContextProvider'
import {toast} from "react-toastify"
import axios from "axios"

const DoctorAppointment = () => {

    const {docAppointment, doctorAppointment, dtoken, backendurl}=useContext(DoctorContext)

    const months=[" ","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"]

  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2]
  }

  function calculateAge(dob) {
    // Convert the dob into a Date object if it's not already
    const birthDate = new Date(dob);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    // Adjust age if the birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  const cancelAppointment=async (appointmentId)=>{
    try {
        const {data}=await axios.post(backendurl+"/api/doctor/doctorcancelappointment",{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            doctorAppointment()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    } 

  }

  const confirmAppointment=async (appointmentId)=>{
    try {
      const {data}=await axios.post(backendurl+"/api/doctor/doctorcompletedappointment",{appointmentId},{headers:{dtoken}})
      if(data.success){
        toast.success(data.message)
        doctorAppointment()
    }else{
        toast.error(data.message)
    }
    } catch (error) {
      console.log(error)
        toast.error(error.message)
    }
  }

    useEffect(()=>{
        doctorAppointment()
    },[dtoken])

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">All Appointments Booked</h1>
          <hr className="mt-4 border-gray-300" />
          {docAppointment.length > 0 ? (
            docAppointment  .map((appointment, index) => (
              <div key={index} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  {/* User Image */}
                  <img 
                    src={appointment.userData.image} 
                    alt={appointment.userData.name} 
                    className="w-20 h-20 rounded-full mr-4 mt-1" 
                  />
                  <div>
                    {/* Email */}
                    <p className="font-semibold text-lg">
                      <span className="text-gray-600">Email: </span>
                      <span className="text-black">{appointment.userData.email}</span>
                    </p>
                    {/* Name */}
                    <p className="font-semibold text-lg">
                      <span className="text-gray-600">Name: </span> 
                      <span className="text-black">{appointment.userData.name}</span>
                    </p>
                    {/* Age */}
                    <p className="text-sm">
                      <span className="text-gray-600">Age: </span>
                      <span className="text-black">{calculateAge(appointment.userData.dob)}</span>
                    </p>
                    {/* Date and Time */}
                    <p className="text-sm">
                      <span className="text-gray-600">Date & Time: </span>
                      <span className="text-black">{slotDateFormat(appointment.slotDate)} || </span>{appointment.slotTime}
                    </p>
                    {/* Fees */}
                    <p className="text-sm">
                      <span className="text-gray-600">Fees: </span>
                      <span className="text-black">₹{appointment.amount}</span>
                    </p>
                  </div>
                </div>
                {/* Cancel Button */}
                 
                <div className="flex mt-4 md:mt-0 space-x-4">
                    { appointment.cancelled && <button
                className="h-16 w-28 text-2xl  text-red-500 bg-gray-200 font-semibold py-2 px-4 rounded flex items-center justify-center"
              >
                Cancelled
              </button>
                    }
              {!appointment.cancelled && !appointment.isCompleted && <button
                className="h-16 w-16 text-4xl hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => cancelAppointment(appointment._id)}
              >
                ❌
              </button>}
              {!appointment.isCompleted && !appointment.cancelled && <button
                className="h-16 w-16 text-4xl hover:bg-green-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => confirmAppointment(appointment._id)}
              >
                ✔
              </button>}
              {appointment.isCompleted && <button
                className="h-16 w-32 text-2xl bg-gray-200 text-green-600 font-semibold py-2 px-4 rounded flex items-center justify-center"
              >
                Completed
              </button>}
            </div>
                
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No appointments found</p>
          )}
          <hr className="mt-6 border-gray-300" />
        </div>
      )
}

export default DoctorAppointment
