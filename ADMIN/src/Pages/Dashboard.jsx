import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from "react-toastify"
import axios from 'axios'
import { AdminContext } from '../context/AdminContextProvider'

const Dashboard = () => {
  const [appointment, setAppointments] = useState(0)
  const [doctor, setDoctor] = useState(0)
  const [patient, setPatient] = useState(0)
  const { backendurl, atoken } = useContext(AdminContext)
  const [latestAppointment, setLatestAppointment] = useState([])

  const months=[" ","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"]

  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2]
  }

  const totalAppointment = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/totalappointment`,
        {},
        { headers: { atoken } }
      )
      if (data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error("Error fetching Total Appointment")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const totalDoctor = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/totaldoctor`,
        {},
        { headers: { atoken } }
      )
      if (data.success) {
        setDoctor(data.doctors)
      } else {
        toast.error("Error fetching Total Doctors")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const totalPatient = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/totaluser`,
        {},
        { headers: { atoken } }
      )
      if (data.success) {
        setPatient(data.users)
      } else {
        toast.error("Error fetching Total Patients")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getLatestAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/admin/latestappointment`,
        { headers: { atoken } }
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

  // Assuming you have a cancelAppointment function in your AdminContext or defined here
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/cancelappointment`,
        { appointmentId },
        { headers: { atoken } }
      )
      if (data.success) {
        toast.success(data.message)
        getLatestAppointment()
        totalAppointment() // update totals if needed
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    totalAppointment()
    totalDoctor()
    totalPatient()
    getLatestAppointment()
  }, [atoken])

  return (
    <div className="container mx-auto p-6">
      {/* Boxes Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Box 1 - Doctors */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <img src={assets.doctor_icon} alt="Doctors Icon" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-gray-600 text-sm">Total Doctors</p>
            <p className="text-lg font-bold text-black">{doctor}</p>
          </div>
        </div>
        {/* Box 2 - Patients */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <img src={assets.patients_icon} alt="Patients Icon" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-gray-600 text-sm">Total Patients</p>
            <p className="text-lg font-bold text-black">{patient}</p>
          </div>
        </div>
        {/* Box 3 - Appointments */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <img src={assets.appointments_icon} alt="Appointments Icon" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-gray-600 text-sm">Total Appointments</p>
            <p className="text-lg font-bold text-black">{appointment}</p>
          </div>
        </div>
      </div>
      
      {/* Latest Appointments Section */}
      <div>
        <h1 className="text-xl font-bold mb-4">Latest Appointments</h1>
        <div className="space-y-4">
          {latestAppointment.length > 0 ? (
            latestAppointment.map((latestApp, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={latestApp.docData.image}
                    alt={latestApp.docData.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="text-black font-semibold">{latestApp.docData.name}</p>
                    <p className="text-sm text-gray-600">
                      Booking on <span className="text-black">{slotDateFormat(latestApp.slotDate)}</span> at <span className="text-black">{latestApp.slotTime}</span>
                    </p>
                  </div>
                </div>
                {latestApp.cancelled ? (
                  <button className="text-red-500 border-red-500 bg-gray-100 font-semibold py-2 px-4 rounded">
                    Cancelled
                  </button>
                ) : (
                  <button 
                    className="h-12 w-12 text-xl hover:bg-red-600 text-white font-semibold rounded flex items-center justify-center"
                    onClick={() => cancelAppointment(latestApp._id)}
                  >
                    ❌
                  </button>
                )}
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

export default Dashboard
