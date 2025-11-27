import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import dotenv from "dotenv"
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ message: "Backend working..." }));
app.use("/resume", resumeRoutes);
app.listen(3000,() => {
    console.log("Server listening on PORT 3000")
})
export default app;
