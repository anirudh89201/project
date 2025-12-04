import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();
export const initiateOTP = async(EmailID) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.EMAIL,
        to:EmailID,
        subject:"Your OTP code",
        text:`Your OTP is ${otp}`
    }
    await transport.sendMail(mailOptions)
    return otp;
}