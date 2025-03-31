import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"
import axios from "axios"
import { AdminContext } from '../context/AdminContextProvider'

const ListAppointment = () => {

  const { getAppointments,Appointment,atoken, backendurl } = useContext(AdminContext)

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
  

  const cancelAppointment=async (appointmentId,docId)=>{
    try {
        const {data}=await axios.post(backendurl+"/api/admin/cancelappointment",{appointmentId},{headers:{atoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    } 

  }

  useEffect(() => {
    getAppointments()
  }, [atoken])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Appointments Booked</h1>
      <hr className="mt-4 border-gray-300" />
      {Appointment.length > 0 ? (
        Appointment.map((appointment, index) => (
          <div key={index} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center">
              {/* User Image */}
              <img 
                src={appointment.userData.image} 
                alt={appointment.userData.name} 
                className="w-20 h-20 rounded-full mr-4 mt-1" 
              />
              <div>
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
                {/* Doctor Name */}
                <p className="text-sm">
                  <span className="text-gray-600">Doctor: </span>
                  <span className="text-black">{appointment.docData.name}</span>
                </p>
                {/* Speciality */}
                <p className="text-sm">
                  <span className="text-gray-600">Speciality: </span>
                  <span className="text-black">{appointment.docData.speciality}</span>
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
            {appointment.cancelled ? (
              <button className="text-red-500 border-red-500 bg-gray-100 font-semibold py-2 px-4 rounded">
                Cancelled
              </button>
            ) : (
              <button className="h-16 text-4xl hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center" onClick={()=>cancelAppointment(appointment._id)}>
                ❌
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No appointments found</p>
      )}
      <hr className="mt-6 border-gray-300" />
    </div>
  )
}

export default ListAppointment
