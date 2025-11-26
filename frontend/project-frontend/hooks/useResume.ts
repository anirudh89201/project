import axios from "axios"
import { DocumentFile } from "@/constants/DocumentFile";
import {useState} from "react"
export const useResume = () => {
    const [loading,setLoading] = useState<boolean|null>(false);
    const [error,setError] = useState(null);
    const [data,setData] = useState<DocumentFile | null>(null);
    const uploadResume = async(file:DocumentFile) => {
        try{
            setLoading(true);
            setError(null);
            const formData = new FormData();
            const rnFile:DocumentFile = {
                uri:file.uri,
                name:file.name,
                type:file.type
            }
            formData.append("resume",rnFile as any)
            const response = await axios.post("http://172.25.96.1:3000/upload",formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }                
            })
            setData(response.data)
            setLoading(false)
            return response.data
        }catch(error:any){
            setError(error.message)
        }finally{
            setLoading(false);
        }
    }
    return {uploadResume,loading,error,data};
}