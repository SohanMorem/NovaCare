
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloundinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import mongoose from "mongoose"
import userModel from "../models/userModel.js"



// Api for add doctor

const addDoctor=async (req,res)=>{

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
        const imageFile=req.file

        //validating details

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || ! address){
            return res.json({success:false,message:"Missing Details"})
        }

        // validate email

        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)

        //upload image using cloundinary
        const imageUpload=await cloundinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl= imageUpload.secure_url


        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor= new doctorModel(doctorData)
        await newDoctor.save()

        console.log("doctor added")
        res.json({success:true,message:"doctor added successfully"})

        

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for admin login

const AdminLogin=async(req,res)=>{
    try {

        const {email,password}=req.body

         // validate email

         if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const atoken=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,atoken})

        }else{
            res.json({success:false,message:"incorrect username or password"})
        }

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}




const ListDoctor=async (req,res)=>{
    try {
        const doctorData=await doctorModel.find({}).select("-password")
        res.json({success:true,doctorData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const removeDoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findByIdAndDelete(docId)
        res.json({ success: true, message: "Doctor Deleted Successfully" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const listAppointment=async (req,res)=>{
    try {

        const appointmentData=await appointmentModel.find({})
        res.json({success:true,appointmentData})
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const cancelAppointment=async (req,res)=>{
    try {
        const {appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:true,message:"Appointment not found or already cancelled"})
        }
        // const docId=appointmentData.docData._id.toString()
        
        const docId = appointmentData.docData._id
        console.log("doc:",docId,"app:",appointmentId)
        if(appointmentData){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    
            const {slotDate,slotTime}=appointmentData
    
            const doctorData=await doctorModel.findById(docId)
    
            let slots_book=doctorData.slots_book
    
            slots_book[slotDate]=slots_book[slotDate].filter((e)=>{
                e !== slotTime
            })
    
            await doctorModel.findByIdAndUpdate(docId,{slots_book})
    
            res.json({success:true,message:"Appointment Cancelled Succcessfully"})
        
    } }catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const totalAppointment=async (req,res)=>{
    try {
        const appointments=(await appointmentModel.find({})).length
        res.json({success:true,appointments})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const totalDoctor=async (req,res)=>{
    try {
        const doctors=(await doctorModel.find({})).length
        res.json({success:true,doctors})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const totalUser=async (req,res)=>{
    try {
        const users=(await userModel.find({})).length
        res.json({success:true,users})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const latestAppointment=async (req,res)=>{
    try {
        const appointmentData=await appointmentModel
        .find({})
        .sort({ _id: -1 })
        .limit(5);
        if(!appointmentData){
            res.json({success:false,message:"Appointments not found"})
        }
        res.json({success:true,appointmentData})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export {addDoctor,AdminLogin,ListDoctor,removeDoctor, listAppointment, cancelAppointment, totalAppointment, totalDoctor, totalUser, latestAppointment}