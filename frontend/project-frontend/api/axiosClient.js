import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "https://project-ga3y.onrender.com/", // Include port
    timeout: 15000, // 15 seconds
});
