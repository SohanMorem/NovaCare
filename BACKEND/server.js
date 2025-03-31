import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './confiq/mongodb.js'
import connectCloudinary from './confiq/cloudinary.js'
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'


// app config

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares

app.use(express.json())
app.use(cors())

 // api endpoint

 app.use("/api/user",userRouter)
 app.use("/api/admin",adminRouter)
 app.use("/api/doctor",doctorRouter)

 app.get("/",(req,res)=>{
    res.send("API Working for HMS")
 })

 app.listen(port,()=>{
    console.log("server running at "+ port)
 })