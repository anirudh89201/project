import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "https://1065aefd1020.ngrok-free.app"// Include port
});
