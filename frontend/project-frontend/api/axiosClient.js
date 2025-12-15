import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "http://54.227.18.181/"// Include port
});
