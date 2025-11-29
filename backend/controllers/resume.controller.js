import {getReport} from "../services/progressReport.js"
export const handleUpload = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(404).json({ message: "File not found" });
        }
        try {
            const response = await getReport(req.file)
            return res.status(200).json({"message":`${response}`})
        } catch (error) {
           return res.status(500).json({"message":`${error.message}`})
        }
    }catch(error){
        console.log(error.message)
    }
};
