import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "http://192.168.0.101:3000"// Include port
});
