import express from "express";
import multer from "multer";
import { handleUpload} from "../controllers/resume.controller.js";
import { optionalJWT } from "../middleware/optionalJWT.js";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/",optionalJWT, upload.single("audio"), handleUpload);

export default router;
