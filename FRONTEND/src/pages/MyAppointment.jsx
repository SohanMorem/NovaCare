import React, { useContext, useEffect, useNavigate, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QuYyWHfp1Ms590tgHhRMMwhDODINYDLjw5iuo8GVUSeiyWqv0ygVxWgjvdkpcWc8Fsw2ZeisRUmWZhhKClv9p8A00VY1CspFi");

const MyAppointment = () => {

  const { token,backendurl,getDoctorsData } = useContext(AppContext);

  const [appointments,setAppointments]=useState([])

  const months=[" ","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"]

  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2]
  }

  const getBookAppointments=async ()=>{
    try {
      const {data}=await axios.get(backendurl+"/api/user/listbookappointment",{headers:{token}})
      if(data.success){
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment=async (appointmentId)=>{
    try {
      const { data } = await axios.post(backendurl+ "/api/user/cancelappointment", { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getBookAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      console.log(appointmentId)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const paymentIntegration=async (appointmentId)=>{
    try {

      if(!appointmentId){
        toast.error("Appointment not found")
      }

      const response=await axios.post(backendurl+"/api/user/paymentintegration",{appointmentId},{headers:{token}})

      // const {sessionId} = await response.data;
      const {url} = await response.data;
      const stripe = await stripePromise;

      if (!url) {
        toast.error("Failed to retrieve session ID.");
        return;
    }

      // await stripe.redirectToCheckout({ sessionId });

      window.location.href = url

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  }

  
  useEffect(()=>{
    getBookAppointments()
  },[token])
  

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          My Appointments
        </h1>
        

        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-start lg:items-center justify-between"
            >
              {/* Doctor Information */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-3/4">
                <img
                  className="w-full sm:w-36 md:w-48 h-[14rem] md:h-56 object-cover rounded-lg"
                  src={appointment.docData.image}
                  alt="Doctor"
                />
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold text-center sm:text-left">
                    {appointment.docData.name}
                  </h2>
                  <p className="text-gray-600 text-center sm:text-left">
                    {appointment.docData.speciality}
                  </p>
                  <p className="text-black text-center sm:text-left mt-2">Address:</p>
                  <p className="text-gray-600 text-center sm:text-left">
                    {appointment.docData.address.line1}
                  </p>
                  <p className="text-gray-600 text-center sm:text-left">
                    {appointment.docData.address.line2}
                  </p>
                  <p className="text-gray-600 text-center sm:text-left mt-2">
                    <span className="text-black">Date & Time:</span> {slotDateFormat(appointment.slotDate)} | {appointment.slotTime}
                  </p>
                </div>
              </div>

              {/* Actions (Hidden if Completed) */}
              {!appointment.isCompleted && (
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  
                  {/* Payment Button */}
                  {!appointment.cancelled && !appointment.payment && (
                    <button className="w-full sm:w-auto px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-600 transition-all duration-300"
                            onClick={() => paymentIntegration(appointment._id)}>
                      Pay Amount
                    </button>
                  )}

                  {/* Payment Done Indicator */}
                  {appointment.payment && !appointment.cancelled && (
                    <button className="w-full sm:w-auto border px-4 py-2 rounded border-blue-500 bg-gray-200 text-blue-600 font-semibold">
                      Payment Done
                    </button>
                  )}

                  {/* Cancel Appointment Button */}
                  {!appointment.cancelled && (
                    <button className="w-full sm:w-auto px-4 py-2 rounded bg-red-400 text-white hover:bg-red-600 transition-all duration-300"
                            onClick={() => cancelAppointment(appointment._id)}>
                      Cancel Appointment
                    </button>
                  )}

                  {/* Canceled Appointment Indicator */}
                  {appointment.cancelled && (
                    <button className="w-full sm:w-auto border px-4 py-2 rounded border-red-500 bg-gray-200 text-red-600 font-semibold">
                      Canceled Appointment
                    </button>
                  )}

                 
                </div>
              )}

                 {/* Completed Indicator */}
              {appointment.isCompleted && (
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button className="h-16 w-full text-2xl bg-gray-200 text-green-600 font-semibold py-2 px-4 rounded">
                  Completed
                </button>
                </div>
              )}
              

            </div>
          ))}

        </div>
      </div>  
      
    </div>
  );
};

export default MyAppointment;

