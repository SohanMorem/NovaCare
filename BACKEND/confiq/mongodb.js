import mongoose from "mongoose";

const connectDB=async ()=>{
    mongoose.connection.on("connected",()=>console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/Hospital`)
}

export default connectDB

//https://cloud.mongodb.com/v2/67704e6df0d7b20b47a12085#/metrics/replicaSet/67704faf7cadfe310a43b02c/explorer/Hospital/doctors/find

// for sending add doctor : https://hoppscotch.io/