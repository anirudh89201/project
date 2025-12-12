import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "http://192.168.0.100:3000", // Include port
    timeout: 15000, // 15 seconds
});
