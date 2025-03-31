import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContextProvider'

const DoctorDashboard = () => {

    const [earning,setEarning]=useState(0)
    const [appointment,setAppointment]=useState(0)
    const [patient,setPatient]=useState(0)
    const [latestAppointment,setLatestAppointment]=useState(0)
    const {dtoken,backendurl}=useContext(DoctorContext)

    const months=[" ","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"]

    const slotDateFormat=(slotDate)=>{
      const dateArray=slotDate.split("_")
      return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2]
    }

    const getTotalEarning=async ()=>{
        try {
            const {data}=await axios.post(backendurl+"/api/doctor/totalearning",{},{headers:{dtoken}})
            if(data.success){
                setEarning(data.earning)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getTotalAppointment=async ()=>{
      try {
          const {data}=await axios.post(backendurl+"/api/doctor/totaldoctorappointment",{},{headers:{dtoken}})
          if(data.success){
              setAppointment(data.doctorData)
          }
      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
  }

  const getTotalPatient=async ()=>{
    try {
        const {data}=await axios.post(backendurl+"/api/doctor/totaldoctorusers",{},{headers:{dtoken}})
        if(data.success){
            setPatient(data.users)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

const getLatestAppointment = async () => {
  try {
    const { data } = await axios.get(
      `${backendurl}/api/doctor/doctorlatestappointment`,
      { headers: { dtoken } }
    )
    if (data.success) {
      setLatestAppointment(data.appointmentData)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

const cancelAppointment=async (appointmentId)=>{
  try {
      const {data}=await axios.post(backendurl+"/api/doctor/doctorcancelappointment",{appointmentId},{headers:{dtoken}})
      if(data.success){
          toast.success(data.message)
          getLatestAppointment()
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
      getLatestAppointment()
  }else{
      toast.error(data.message)
  }
  } catch (error) {
    console.log(error)
      toast.error(error.message)
  }
}

    useEffect(()=>{
        getTotalEarning(),
        getTotalAppointment(),
        getTotalPatient(),
        getLatestAppointment()
    },[dtoken])

  return (
      <div className="container mx-auto p-6">
            {/* Boxes Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Box 1 - Earnings */}
              <div className="bg-white shadow rounded-lg p-4 flex items-center">
                <img src={assets.earning_icon} alt="Patients Icon" className="w-12 h-12 mr-4" />
                <div>
                  <p className="text-gray-600 text-sm">Total Earnings</p>
                  <p className="text-lg font-bold text-black">₹{earning}</p>
                </div>
              </div>
              {/* Box 2 - Appointments */}
              <div className="bg-white shadow rounded-lg p-4 flex items-center">
                <img src={assets.appointments_icon} alt="Appointments Icon" className="w-12 h-12 mr-4" />
                <div>
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-lg font-bold text-black">{appointment}</p>
                </div>
              </div>
              {/* Box 3 - Patient */}{
                <div className="bg-white shadow rounded-lg p-4 flex items-center">
                <img src={assets.appointments_icon} alt="Appointments Icon" className="w-12 h-12 mr-4" />
                <div>
                  <p className="text-gray-600 text-sm">Total Patients</p>
                  <p className="text-lg font-bold text-black">{patient}</p>
                </div>
              </div>
              }
            </div>

              {/* Latest Appointments Section */}
      <div>
        <h1 className="text-xl font-bold mb-4">Latest Two Appointments</h1>
        <div className="space-y-4">
          {latestAppointment.length > 0 ? (
            latestAppointment.map((latestApp, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={latestApp.userData.image}
                    alt={latestApp.userData.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="text-black font-semibold">{latestApp.userData.name}</p>
                    <p className="text-sm text-gray-600">
                      Booking on <span className="text-black">{slotDateFormat(latestApp.slotDate)}</span> at <span className="text-black">{latestApp.slotTime}</span>
                    </p>
                  </div>
                </div>
                {/* Cancel Button */}
                 
                <div className="flex mt-4 md:mt-0 space-x-4">
                    { latestApp.cancelled && <button
                className="h-16 w-28 text-2xl  text-red-500 bg-gray-200 font-semibold py-2 px-4 rounded flex items-center justify-center"
              >
                Cancelled
              </button>
                    }
              {!latestApp.cancelled && !latestApp.isCompleted && <button
                className="h-16 w-16 text-4xl hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => cancelAppointment(latestApp._id)}
              >
                ❌
              </button>}
              {!latestApp.isCompleted && !latestApp.cancelled && <button
                className="h-16 w-16 text-4xl hover:bg-green-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                onClick={() => confirmAppointment(latestApp._id)}
              >
                ✔
              </button>}
              {latestApp.isCompleted && <button
                className="h-16 w-32 text-2xl bg-gray-200 text-green-600 font-semibold py-2 px-4 rounded flex items-center justify-center"
              >
                Completed
              </button>}
            </div>
                
                
              </div>
            ))
          ) : (
            <p className="text-gray-500">No latest appointments found</p>
          )}
        </div>
      </div>

            </div>
  )
}

export default DoctorDashboard
