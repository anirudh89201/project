import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.router.js"
import Reportrouter from "./routes/report.router.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json())
app.get("/", (req, res) => res.status(200).json({ message: "Backend working..." }));
app.use("/upload", resumeRoutes);
app.use("/auth",authRoutes)
app.use("/report",Reportrouter)
app.listen(3000,() => {
    console.log("Server listening on PORT 3000")
})
export default app;
