import mongoose from "mongoose";

const otpschema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    otp:{type:Number,required:true},
    expiry:{type:String,required:true}
})


const otpmodel=mongoose.models.otp || mongoose.model("otp",otpschema)

export default otpmodel