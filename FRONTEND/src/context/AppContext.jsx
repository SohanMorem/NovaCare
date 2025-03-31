import { createContext, useEffect, useState } from "react";
import {toast} from "react-toastify"
import axios from "axios"

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):false)

    const backendurl= import.meta.env.VITE_BACKEND_URL

    const currencySymbol="₹"

    const [userData,setUserData]=useState(false)
    const [doctors,setDoctors]=useState([])

    const  getDoctorsData=async ()=>{
        try {
            const {data}=await axios.get("http://localhost:4000/api/doctor/list")
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
        } catch (error) {
            toast.error(error.message)
        }
    } 

    useEffect(()=>{
        getDoctorsData()
    },[])

    

    const loadUserData=async ()=>{
        try {

            const {data}=await axios.get(backendurl + '/api/user/getUserDetail',{headers:{token}})

            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value={
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendurl,
        userData,
        setUserData,
        loadUserData
    }

    useEffect(()=>{
        if(token){
            loadUserData()
        }else{
            setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider