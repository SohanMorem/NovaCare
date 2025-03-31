import express from "express"
import { cancelAppointment, CompletedAppointment, doctorAppointment, doctorList, DoctorLogin, getDoctorProfile, latestAppointment, totalDoctorAppointment, totalDoctorUsers, totalEarnings, updateDoctorProfile } from "../controllers/doctorController.js"
import authDoctor from "../middleware/authDoctor.js"
import upload from "../middleware/multer.js"

const doctorRouter=express.Router()

doctorRouter.get("/list",doctorList)
doctorRouter.post("/doctorlogin",DoctorLogin)
doctorRouter.get("/doctorappointment",authDoctor,doctorAppointment)
doctorRouter.post("/doctorcancelappointment",authDoctor,cancelAppointment)
doctorRouter.post("/doctorcompletedappointment",authDoctor,CompletedAppointment)
doctorRouter.post("/totalearning",authDoctor,totalEarnings)
doctorRouter.post("/totaldoctorappointment",authDoctor,totalDoctorAppointment)
doctorRouter.post("/totaldoctorusers",authDoctor,totalDoctorUsers)
doctorRouter.get("/doctorlatestappointment",authDoctor,latestAppointment)
doctorRouter.post("/getdoctorprofile",authDoctor,getDoctorProfile)
doctorRouter.post("/updatedoctorprofile",upload.single("image"),authDoctor,updateDoctorProfile)

export default doctorRouter