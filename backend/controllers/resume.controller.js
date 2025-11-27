import { uploadResume } from "../services/resume.service.js";

export const handleUpload = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ message: "File not found" });
    }
    try {
        const summary = await uploadResume(req.file);
        return res.status(200).json({
            sucess:true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
