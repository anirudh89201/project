import express from "express"
import { optionalJWT } from "../middleware/optionalJWT.js";
import { getAllreports, getLastReport} from "../controllers/reports.controller.js";
const Reportrouter = express.Router();

Reportrouter.get("/latest",optionalJWT,getLastReport)
Reportrouter.get("/AllReports",optionalJWT,getAllreports)
export default Reportrouter