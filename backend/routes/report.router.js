import express from "express"
import { optionalJWT } from "../middleware/optionalJWT.js";
import { getLastReport} from "../controllers/reports.controller.js";
const Reportrouter = express.Router();

Reportrouter.get("/latest",optionalJWT,getLastReport)
export default Reportrouter