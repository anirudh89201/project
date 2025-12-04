import { initiateOTP } from "../services/initiateOTP.js";
import {getReport} from "../services/progressReport.js"
import { otpStore } from "../store/otpStore.js";
export const handleUpload = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(404).json({ message: "File not found" });
        }
        try {

            const response = await getReport(req.file,req.body.Question)
            return res.status(200).json({"message":`${response}`})
        } catch (error) {
           return res.status(500).json({"message":`${error.message}`})
        }
    }catch(error){
        console.log(error.message)
    }
};

export const sendOTP = async(req,res) => {

    const {EmailID} = req.body;
    try{
        if(!req.body){
            return res.status(404).json({"message":"EmailID does nto exist"})
        }
        try{
            const response = await initiateOTP(EmailID)
            otpStore[EmailID] = {
                response,
                expriesAt:Date.now() + 5*60*1000
            }
            return res.status(200).json(response)
        }catch(error){
            console.log(error)
            return res.status(500).json(error.message)
        }
    }catch(error){
        console.log(error.message)
    }
}
export const verifyOTP = async(req,res) => {
    const {OTP,EmailID} = req.body;
    if(!OTP || !EmailID){
        return res.status(400).json({message:"Email and OTP are required"})
    }
    const record = otpStore[EmailID]
    if(!record){
        return res.status(400).json({message:"OTP not found or expired"})
    }
    if(Date.now() > record.expriesAt){
        delete otpStore[EmailID]
        return res.status(405).json({message:"OTP has been expired"})
    }
    if(OTP != record.OTP){
        return res.status(400).json({message:"Invalid OTP"})
    }
    delete otpStore[EmailID]
    return res.status(200).json({message:"OTP Successfully verified"})
    
}