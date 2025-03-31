import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const DoctorContext= createContext()

const DoctorContextProvider=(props)=>{
    
    const [dtoken,setDtoken]=useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):"")
    const [docAppointment,setDocAppointment]=useState([])
    const [doctorData,setDoctorData]=useState(false)
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const doctorAppointment = async ()=>{
        try {
            const {data}=await axios.get(backendurl+"/api/doctor/doctorappointment",{headers:{dtoken}})
            if(data.success){
                setDocAppointment(data.doctorData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDoctorDetail=async ()=>{
        try {
            const {data}=await axios.post(backendurl+"/api/doctor/getdoctorprofile",{},{headers:{dtoken}})
            if(data.success){
                setDoctorData(data.doctorData)
                console.log(data.doctorData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    

    useEffect(()=>{
        if (dtoken) {
            getDoctorDetail();
        }
    },[dtoken])

    const value={
        dtoken,
        setDtoken,
        docAppointment,
        setDocAppointment,
        doctorAppointment,
        backendurl,
        doctorData,
        setDoctorData,
        getDoctorDetail
    }

    return(
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
    )
}

export default DoctorContextProvider