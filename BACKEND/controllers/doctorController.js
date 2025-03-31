import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import validator from "validator"
import appointmentModel from "../models/appointmentModel.js"
import {v2 as cloudinary} from "cloudinary"

const changeAvailability=async (req,res)=>{
   

    try {

        const {docId}=req.body
        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:"Availability Changed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorList=async (req,res)=>{
    try {

        const doctors= await doctorModel.find({}).select(["-password","-email"])
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const DoctorLogin=async (req,res)=>{
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})

        if(!email || !password){
            return res.json({success:false,message:"Please Enter All Details"})
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid email" })
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9]{5,}@gmail\.com$/;

        if (!emailPattern.test(email)) {
            return res.json({ success: false, message: "Enter a valid email with 5 or more long characters" })
        }

        if(!doctor){
            return res.json({success:false,message:"Doctor Does Not Exist"})
        }

        const isMatch=await bcrypt.compare(password,doctor.password)

        if(isMatch){
            const dtoken= await jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,dtoken})
        }else{
            res.json({success:false,message:"Password is incorrect"})
        }

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const doctorAppointment=async (req,res)=>{
    try {
        const {docId}=req.body
        const doctorData=await appointmentModel.find({docId})
        if(!doctorData){
            return res.json({success:false,message:"Doctor not found"})
        }
        res.json({success:true,doctorData})
    } catch (error) {
        res.json({success:false,message:error.message})
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
        
        
        if(appointmentData){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    
            const {docId,slotDate,slotTime}=appointmentData
    
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

const CompletedAppointment=async (req,res)=>{
    
    try {
        const {appointmentId}=req.body
        await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true,payment:true})
        res.json({success:true,message:"Appointment Completed"})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

const totalEarnings=async (req,res)=>{
    try {
        const {docId}=req.body
        const appointmentData=await appointmentModel.find({docId})
        let earning=0
        appointmentData.forEach(appointment => {
            if (appointment.payment && !appointment.cancelled) {
                earning += appointment.amount; // Accumulate earnings correctly
            }
        });

        res.json({success:true,earning})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const totalDoctorAppointment=async (req,res)=>{
    try {
        const {docId}=req.body
        const doctorData=await (await appointmentModel.find({docId})).length
        if(!doctorData){
            return res.json({success:false,message:"Doctor not found"})
        }
        res.json({success:true,doctorData})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const totalDoctorUsers = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointmentData = await appointmentModel.find({ docId });

        if (appointmentData.length === 0) {
            return res.json({ success: false, message: "Doctor not found or has no appointments" });
        }

        // Using a Set to store unique user IDs
        const uniqueUsers = new Set();

        appointmentData.forEach(appointment => {
            uniqueUsers.add(appointment.userId);
        });

        res.json({ success: true, users: uniqueUsers.size }); // Return the count of unique users
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const latestAppointment=async (req,res)=>{
    try {
        const {docId}=req.body
        const appointmentData=await appointmentModel
        .find({docId})
        .sort({ _id: -1 })
        .limit(2);
        if(!appointmentData){
            res.json({success:false,message:"Appointments not found"})
        }
        res.json({success:true,appointmentData})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const getDoctorProfile=async (req,res)=>{
    try {
        const {docId}=req.body
        const doctorData=await doctorModel.findById(docId).select('-password')
        if(!doctorData){
           return res.json({success:false,message:"Doctor not Exist"})
        }
        res.json({success:true,doctorData})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const updateDoctorProfile=async (req,res)=>{
    try {
        const {docId,name,speciality,degree,experience,address,fees,about}=req.body
        const imageFile=req.file

        if(!name || !speciality || ! degree || !experience || !fees){
            return res.json({success:false,message:"data is missing"})
        }

        let parsedAddress;
        try {
            parsedAddress=address ? JSON.parse(address):""
        } catch (error) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        await doctorModel.findByIdAndUpdate(docId,{name,speciality,degree,fees,experience,address:parsedAddress})

        if(imageFile){
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl=imageUpload.secure_url
            await doctorModel.findByIdAndUpdate(docId,{image:imageUrl})
            console.log("updated doctor image")
        }

        const updatedFields = { 
            "docData.name": name, 
            "docData.fees": fees, 
            "docData.speciality": speciality, 
            "docData.experience": experience, 
            "docData.degree": degree, 
            "docData.address": parsedAddress ,
            "docData.about": about ,
          };
          
          if (imageFile) {
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl= imageUpload.secure_url
            updatedFields["docData.image"] = imageUrl;
            console.log("updated doctor image appointment also")
          }

          await appointmentModel.updateMany(
            { docId },
            { $set: updatedFields }
          );


        res.json({ success: true, message: "Doctor profile updated Successfully" })
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export {changeAvailability,doctorList, DoctorLogin, doctorAppointment,cancelAppointment, CompletedAppointment, totalEarnings, totalDoctorAppointment, totalDoctorUsers, latestAppointment, getDoctorProfile, updateDoctorProfile}

