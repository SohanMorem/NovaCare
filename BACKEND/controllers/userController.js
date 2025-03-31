import validator from 'validator'
import bcrypt from 'bcrypt'
import moment from "moment"
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {sendContact, sendMail} from '../middleware/sendMail.js'
import otpmodel from '../models/otpmodel.js'
import sendMailforgot from '../middleware/forgotPassword.js'
import {v2 as cloundinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Stripe from 'stripe'
// API for register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password,cpassword } = req.body
        //checking any field is not empty
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Please Enter All Details" })
        }
        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9.]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        //validating spassword and Confirm password same or not
        if (cpassword !== password) {
            return res.json({ success: false, message: "Password and Confirm Password does not same" })
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user data to save in database
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)

        // saving data to the database
        const user = await newUser.save()

        //send mail to user

        sendMail(email,"welcome to novacare website","",`<b>Hello ${name},thank you for successfully sign up to our website<b>`)

        //creating joken

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: true, message: error.message })
    }
}


// API for user login 

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        //checking any field is not empty
        if (!password || !email) {
            return res.json({ success: false, message: "Please Enter All Details" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9.]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        if (!user) {
            return res.json({ success: false, message: "user does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Password is incorrect" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getUserDetails=async (req,res)=>{
    try {
        const {userId}=req.body
    const userData=await userModel.findById(userId).select('-password')

    res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for updating user details

const updateUserDetails=async (req,res)=>{
    try {
        console.log(req.body)
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile=req.file
        console.log(req.body)
        console.log(req.file)


        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data is missing" });
        }
      
        let parsedAddress;
        try {
            parsedAddress = address ? JSON.parse(address) : "";
        } catch (parseError) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })
        

        if(imageFile){
            const imageUpload=await cloundinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl= imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image: imageUrl})
            console.log("updated image")
            // return res.json({success:true,message:"image updated successfully"})
            
        }
        const updatedFields = { 
            "userData.name": name, 
            "userData.phone": phone, 
            "userData.dob": dob, 
            "userData.gender": gender, 
            "userData.address": parsedAddress 
          };
          
          if (imageFile) {
            const imageUpload=await cloundinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl= imageUpload.secure_url
            updatedFields["userData.image"] = imageUrl;
            console.log("update image appointment")
          }

           appointmentModel.updateMany(
            { userId },
            { $set: updatedFields }
          );

        res.json({ success: true, message: "profile updated Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//    API for send message to email for contact page

const UserContact=async (req,res)=>{

    try {
        const {username,email,phone,message}=req.body
        sendContact(email,"Message For NovaCare","",`From : ${email} <br> <br> ${message} <br> <b>Thank You,<br> ${username}</b>`)
        res.json({success:true,message:"Email Sent Successfully"})
        console.log("email sent",email)
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


// function for otp generator
const otpgenerator=async ()=>{
    const otp=Math.floor(1000+Math.random()*9000)
    const expiry=Date.now() + 5*60*1000

    return {otp,expiry}
}

// Api for the user forgot password
const userForgotPassword= async (req,res)=>{

    const {email}=req.body

    const data = await userModel.findOne({email})

    if(!data){
        res.json({success:false,message:"user does not exist"})
    }

    const {otp,expiry}=await otpgenerator()

    try {
        const otpdata={
            email,
            otp,
            expiry
        }
    
        const newotp= new otpmodel(otpdata)
        await newotp.save()

        const emailText = `<pre>Dear ${data.name},

We received a request to reset your password. To proceed, please use the following one-time password (OTP):

Your OTP: <b>${otp}</b>

This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this message.

Best regards,
The NovaCare Team</pre>`

    await sendMailforgot(email,"Otp for forgot password","",emailText )

    res.json({success:true,message:"Otp sent to your email"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }



}

// Api for verify user otp

const userverifyotp=async (req,res)=>{
    const {email,otp}=req.body
    console.log(email,otp)
    try {
        const data=await otpmodel.findOne({email})
        if(!data){
           return res.json({success:false,message:"email is not found in the otp database"})
        }

        console.log(data.email,data.otp)
        const currentTime=moment().valueOf()

        console.log("exp:"+data.expiry)
        console.log("exp:"+currentTime)


        if(currentTime > data.expiry){
            console.log("expires")
            return res.json({success:false,message:"Otp has been expired"})
        }

        if(Number(otp)=== Number(data.otp)){
            console.log("same")
            await otpmodel.deleteOne({email})
            res.json({success:true,message:"otp verified successfully"})

        }else{
            res.json({success:false,message:"Invalid OTP"})
        }



    } catch (error) {
        console.log("catch error",error)
        res.json({success:false,message:error.message})
    }
}

// Api for the update password

const updatePassword=async (req,res)=>{
    const {email,newpassword}=req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(newpassword, salt)

        const data= await userModel.updateOne({email},{ $set: { password: newHashedPassword }})
        if(!data){
            console.log("user not found")
            res.json({success:false,message:"user not found"})
        }else{
            console.log("updated")
            res.json({success:true,message:"password updated successfully"})
        }
    } catch (error) {
        console.log("catch error",error)
        res.json({success:false,message:error.message})
    }
}

// Api for the resend otp

const resendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if an OTP already exists for the email
      const existingemail = await otpmodel.findOne({ email });
      if (existingemail) {
        await otpmodel.deleteOne({ email });
      }
  
      // Check if the user exists
      const data = await userModel.findOne({ email });
      if (!data) {
        return res.json({ success: false, message: "User does not exist" });
      }
  
      // Generate a new OTP
      const { otp, expiry } = await otpgenerator();
  
      const otpdata = {
        email,
        otp,
        expiry,
      };
  
      const newotp = new otpmodel(otpdata);
      await newotp.save();
  
      // Prepare the email text
      const emailText = `<pre>Dear ${data.name},
  
  We received a request to reset your password. To proceed, please use the following one-time password (OTP):
  
  Your OTP: <b>${otp}</b>
  
  This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this message.
  
  Best regards,
  The NovaCare Team</pre>`;
  
      // Send the email
      await sendMailforgot(email, "OTP for Forgot Password", "", emailText);
  
      // Respond with success
      return res.json({ success: true, message: "OTP sent to your email" });
  
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };

  // api to book appointment

  const bookAppointment=async (req,res)=>{
    try {
        
        const {userId,docId,slotDate,slotTime}=req.body

        const docData= await doctorModel.findById(docId).select("-password")

        if(!docData.available){
            return res.json({success:false,message:"Doctor not Available"})
        }

        let slots_book=docData.slots_book

        // checking slot available

        if(slots_book[slotDate]){
            if(slots_book[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not Available"})
            }else{
                slots_book[slotDate].push(slotTime)
            }
        }else{
            slots_book[slotDate]=[]
            slots_book[slotDate].push(slotTime)
        }

        const userData=await userModel.findById(userId).select("-password")

        delete docData.slots_book

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment=new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slot to doctors

        await doctorModel.findByIdAndUpdate(docId,{slots_book})


        res.json({success:true,message:"Appointment booked Successfully"})

        // sendSms(userData.phone,"you have successfully booked an appointmnet")

        const appointmentMessage = `<pre>
Dear ${userData.name},

Thank you for booking an appointment with us!

Your appointment has been successfully scheduled on ${slotDate} at ${slotTime} with Dr. ${docData.name}. Please arrive a few minutes early to complete any necessary paperwork.

If you have any questions or need to reschedule, please call us at  
📞 <a href="tel:8140794715">8140794715</a>.


Looking forward to seeing you soon!

Best regards,  
NovaCare Health Management
</pre>`;

    sendMail(userData.email,"BOOKING APPOINTMENT","",appointmentMessage)

    } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    }
  }

  //api for displaying appointment

  const ListBookAppointmnets=async(req,res)=>{
    try {
        const {userId}=req.body

        const appointments=await appointmentModel.find({userId})

        res.json({success:true,appointments})
        
    } catch (error) {
        console.error(error);
    res.json({ success: false, message: error.message });
    }
  }

  // api for cancel appointment
  const cancelAppointment= async (req,res)=>{
    try {
        const {userId,appointmentId}=req.body

        const appointmentData=await appointmentModel.findById(appointmentId)
    
        if(appointmentData.userId == userId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    
            const {docId,slotDate,slotTime}=appointmentData
    
            const doctorData=await doctorModel.findById(docId)
    
            let slots_book=doctorData.slots_book
    
            slots_book[slotDate]=slots_book[slotDate].filter((e)=>{
                e !== slotTime
            })
    
            await doctorModel.findByIdAndUpdate(docId,{slots_book})
    
            res.json({success:true,message:"Appointmnet Cancelled Succcessfully"})
        }else{
            res.json({success:false,message:"uuser not login"})
        }
    } catch (error) {
        console.error(error);
    res.json({ success: false, message: error.message });
    }
  }


  // api for payment
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntegration=async (req,res)=>{
    
        try {
            const { appointmentId } = req.body;
            const appointmentData=await appointmentModel.findById(appointmentId)

            if (!appointmentData) {
                    return res.json({ success: false, message: "Booking Not Found" });
                }
            if (appointmentData.cancelled) {
                    return res.json({ success: false, message: "Your Booking is Already Cancelled" });
                }
        
           if(appointmentData){
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_URL}/cancel?id=${appointmentId}`,
                line_items: [
                  {
                    price_data: {
                      currency: "inr",
                      product_data: {
                        name: "Payment Integration",
                      },
                      unit_amount: appointmentData.amount * 100, // Convert to cents
                    },
                    quantity: 1,
                  },
                ],  
                metadata: {
                    appointmentId: String(appointmentData._id),  // Store appointment ID
                    // userId: appointmentData.userId,  // Store user ID (optional)
                    // customNote: "Payment for appointment booking" // Any additional info
                }
              });
          
              res.json({success:true, url: session.url });
            //   await appointmentModel.findByIdAndUpdate(appointmentId,{payment:true})
              
           }else{
                res.json({success:false,message:"Payment Failed"})
           }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating Stripe session" });
          }
    
}

const fetchTransactions=async (req,res)=>{
    try {
        const { sessionId } = req.body;
        console.log("Session is:" + sessionId)
        if (!sessionId) {
          return res.json({ success:false,error: "Session ID is required" });
        }

        
    
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("sessions:",session)
        
        if (!session) {
          return res.json({success:false,error: "Transaction not found" });
        }

        const appointmentId = session.metadata?.appointmentId;
        console.log("Appointment ID:", appointmentId);

        const appointmentData=await appointmentModel.findById(appointmentId)

        if(session.payment_status === "paid"){
            await appointmentModel.findByIdAndUpdate(appointmentId,{payment:true})
            
            const sendMailPayment=`<pre>Hello ${appointmentData.userData.name},

Thank you for your payment. We have successfully received your transaction. Below are your payment details:

Transaction ID: ${session.id}
Amount Paid: ${session.amount_total / 100}
Date: ${new Date(session.created * 1000)}
A confirmation of this transaction has been recorded, and you may keep this email for your records. If you have any questions, feel free to contact our support team.

Best Regards,
NovaCare Health Management</pre>`;
              
        await sendMail(appointmentData.userData.email,"Payment Confirmation - Your Transaction Was Successful","",sendMailPayment)

        return res.json({success:true,session});
       }
    
       res.json({ success: false, message: "Payment not completed" });
       
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
  



export { registerUser, loginUser, getUserDetails, updateUserDetails,UserContact,userForgotPassword, userverifyotp, updatePassword, resendOtp, bookAppointment, ListBookAppointmnets, cancelAppointment, paymentIntegration, fetchTransactions}