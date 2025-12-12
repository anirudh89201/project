import {axiosClient} from "../api/axiosClient.js"
export const verifyOTP = async(OTP,EmailID) => {
    try{
        const data = {OTP,EmailID}
        console.log(data)
        const response = await axiosClient.post("/auth/verify-otp",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        return {success: true,data:response.data}
    }catch(err){
        const msg = err.response?.data?.message || "Something went wrong.."
        console.log("Error is:",msg)
        return {data:msg}
    }
}