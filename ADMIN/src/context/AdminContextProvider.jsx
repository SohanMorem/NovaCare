import { createContext, useContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"


export const AdminContext= createContext()

const AdminContextProvider=(props)=>{

    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"")
    const [doctors,setDoctors]=useState([])
    const [Appointment, SetAppointment] = useState([])
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const getAllDoctors=async ()=>{
        try {
            const {data}=await axios.post(backendurl+"/api/admin/allDoctor",{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctorData)
                console.log(data.doctorData)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const changeAvailable=async (docId)=>{
        try {
            const {data}=await axios.post(backendurl+"/api/admin/available",{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getAppointments = async () => {
        try {
          const { data } = await axios.get(`${backendurl}/api/admin/listappointment`, { headers: { atoken } })
          if (data.success) {
            SetAppointment(data.appointmentData)
          } else {
            toast.error("Error fetching appointment")
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }

    const removeDoctor=async (docId)=>{
        try {
            const {data}=await axios.post(backendurl+"/api/admin/removeDoctor",{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            } 
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value={
        atoken,
        setAtoken,
        backendurl,
        doctors,
        getAllDoctors,
        changeAvailable,
        removeDoctor,
        getAppointments,
        Appointment
    }



    return(
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
    )
}

export default AdminContextProvider