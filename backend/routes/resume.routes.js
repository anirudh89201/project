import express from "express";
import multer from "multer";
import { handleUpload} from "../controllers/resume.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("audio"), handleUpload);

export default router;
