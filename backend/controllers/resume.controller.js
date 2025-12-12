import { getToken } from "../config/jwttoken.js";
import { SaveReportForUser } from "../services/SaveReport.js";
import { initiateOTP } from "../services/initiateOTP.js";
import {getReport} from "../services/progressReport.js"
import { otpStore } from "../store/otpStore.js";
export const handleUpload = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(404).json({ message: "File not found" });
        }
        try {
            console.log(req.user.EmailID)
            const response = await getReport(req.file,req.body.Question)
            if(req.user){
                await SaveReportForUser(req.user.EmailID,response)
            }
            return res.status(200).json({success:true})
        } catch (error) {
            console.log("Error message is:",error.message)
            console.log(error.stack)
           return res.status(500).json({message:`${error.message}`})
        }
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:error.message})
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
    console.log(OTP + " " + EmailID)
    if(!OTP || !EmailID){
        return res.status(400).json({message:"Email and OTP are required"})
    }
    const record = otpStore[EmailID]
    console.log(record)
    if(!record){
        return res.status(400).json({message:"OTP not found or expired"})
    }
    if(Date.now() > record.expriesAt){
        delete otpStore[EmailID]
        return res.status(405).json({message:"OTP has been expired"})
    }
    if(String(OTP) !== String(record.response)){
        return res.status(400).json({message:"Invalid OTP"})
    }
    delete otpStore[EmailID]
    const token = getToken(EmailID)
    return res.status(200).json({token,message:"OTP Successfully verified"})
    
}
// export const InsertReport = async(req,res) => {
//     if(!req.body){
//         return res.status(204).json({message:"No content provided."})
//     }
//     const {EmailID,Report} = req.body;
//     if(!EmailID || !Report){
//         return res.status(400).json({message:"UnAuthorized user.."})
//     }
//     const response = await SaveReportForUser(EmailID,Report)
//     if(!response.success){
//         return res.status(500).json({message:"Internal Server Error"})
//     }
//     return res.status(500).json({message:`${JSON.stringify(response)}`}); 
// }
// export const GetUserReport = async (req, res) => {
//   const emailId = req.query.emailId; // match the query param exactly
//   if (!emailId) {
//     return res.status(400).json({ message: "Unauthorized route.." });
//   }

//   try {
//     const data = await getReports(emailId);
//     return res.json(data); // no need for JSON.stringify
//   } catch (err) {
//     console.log("Error fetching reports:", err);
//     return res.status(500).json({ message: "Failed to fetch reports" });
//   }
// };
