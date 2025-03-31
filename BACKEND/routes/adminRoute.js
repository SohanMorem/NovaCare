import express from "express"
import { addDoctor, AdminLogin, cancelAppointment, latestAppointment, listAppointment, ListDoctor, removeDoctor, totalAppointment, totalDoctor, totalUser } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailability } from "../controllers/doctorController.js"

const adminRouter=express.Router()

adminRouter.post("/addDoctor",upload.single("image"),authAdmin,addDoctor)
adminRouter.post("/adminLogin",AdminLogin)
adminRouter.post("/allDoctor",authAdmin,ListDoctor)
adminRouter.post("/available",authAdmin,changeAvailability)
adminRouter.post("/removeDoctor",authAdmin,removeDoctor)
adminRouter.get("/listappointment",authAdmin,listAppointment)
adminRouter.post("/cancelappointment",authAdmin,cancelAppointment)
adminRouter.post("/totalappointment",authAdmin,totalAppointment)
adminRouter.post("/totaldoctor",authAdmin,totalDoctor)
adminRouter.post("/totaluser",authAdmin,totalUser)
adminRouter.get("/latestappointment",authAdmin,latestAppointment)

export default adminRouter