import twilio from "twilio"

const accountsid=process.env.TWILIO_SID
const token=process.env.TWILIO_TOKEN

const client=twilio(accountsid,token)

const sendSms=async (to,msg)=>{
    let msgOption={
        from : process.env.TWILIO_NUMBER,
        to,
        body:msg
    }
    try {
        const message= await client.messages.create(msgOption) 
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

export default sendSms