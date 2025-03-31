import express from 'express'
import { loginUser, registerUser, getUserDetails, updateUserDetails,UserContact, userForgotPassword, userverifyotp, updatePassword, resendOtp, bookAppointment, ListBookAppointmnets, cancelAppointment, paymentIntegration, fetchTransactions } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from "../middleware/multer.js"


const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getUserDetail',authUser,getUserDetails)
userRouter.post('/updateUserDetail',upload.single("image"),authUser,updateUserDetails)
userRouter.post('/usercontact',authUser,UserContact)
userRouter.post('/userforgotpassword',userForgotPassword)
userRouter.post('/userverifyotp',userverifyotp)
userRouter.post('/userupdatepassword',updatePassword)
userRouter.post('/userresendotp',resendOtp)
userRouter.post('/bookappointment',authUser,bookAppointment)
userRouter.get('/listbookappointment',authUser,ListBookAppointmnets)
userRouter.post('/cancelappointment',authUser,cancelAppointment)
userRouter.post('/paymentintegration',authUser,paymentIntegration)
userRouter.post('/fetchTransactions',authUser,fetchTransactions)



export default userRouter