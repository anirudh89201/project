import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "http://192.168.0.103:3000"// Include port
});
