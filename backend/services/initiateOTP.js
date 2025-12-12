import dotenv from "dotenv"
import { Resend } from "resend";
dotenv.config();
const resend = new Resend(process.env.RESENDAPI_KEY)
export const initiateOTP = async(EmailID) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    const mailOptions = {
        from:"onboarding@resend.dev",
        to:EmailID,
        subject:"Your OTP code",
        text:`Your OTP is ${otp}`
    }
    await resend.emails.send(mailOptions)
    return otp;
}