import {getReport} from "../services/progressReport.js"
export const handleUpload = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(404).json({ message: "File not found" });
        }
        try {

            const response = await getReport(req.file,req.body.Question)
            return res.status(200).json({"message":`${response}`})
        } catch (error) {
            console.log("Sedda u are coming here...")
           return res.status(500).json({"message":`${error.message}`})
        }
    }catch(error){
        console.log(error.message)
    }
};
