import jwt from "jsonwebtoken"

const authDoctor=async (req,res,next)=>{
    try {
        const {dtoken}=req.headers
        if(!dtoken){
           return res.json({success:false,message:"Doctor not login"})
        }
            const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET)
            req.body.docId=token_decode.id
            console.log(req.body.docId)
            next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export default authDoctor