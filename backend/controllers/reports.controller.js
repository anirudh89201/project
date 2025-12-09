import {getLatestReport} from "../services/getAllReport.js"
import { getReports } from "../services/getAllReport.js";
export const getLastReport = async(req,res) => {
    if(!req.user){
        return res.status(400).json({message:"UnAuthorized User.."})
    }
    const email = req.user.EmailID;
    try{
        const item = await getLatestReport(email)      
        return res.status(200).json(item)
    }catch(error){
        console.log("Error is:",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export const getAllreports = async(req,res) => {
    if(!req.user){
        return res.status(400).json({message:"UnAuthorized user.."})
    }
    const email = req.user.EmailID;
    try{
        const data = await getReports(email)
        return res.status(200).json(data)
    }catch(error){
        console.log("Error is",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}