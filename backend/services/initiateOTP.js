import dotenv from "dotenv"
import { Resend } from "resend";
dotenv.config();
const resend = new Resend(process.env.RESENDAPI_KEY)
export const initiateOTP = async(EmailID) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(EmailID)
    const mailOptions = {
        from: "Xyra Support <support@xyra.co.in>",
        to: EmailID,
        subject: "Your Xyra App OTP Code",
        text: `
    Hi there,
    
    Your one-time password (OTP) for accessing your Xyra account is:
    
    ${otp}
    If you did not request this code, you can safely ignore this email.
    
    Thank you for using Xyra!  
    — The Xyra Team
    `
    }
    
    try{

        const response = await resend.emails.send(mailOptions)
        console.log("Email sent response",response)
    }catch(error){
        console.error("Error sending email",err)
        throw err
    }
    return otp;  
}