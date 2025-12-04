import { axiosClient } from "./axiosClient.js";
export const sendOTP = async (EmailID) => {
    try {
        const response = await axiosClient.post(
            "/auth/send-otp",
            { EmailID }
        );

        return response.data;  // success
    } catch (error) {
        console.log("Axios Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
};
