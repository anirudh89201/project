import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import authRoutes from "./routes/auth.router.js";
import Reportrouter from "./routes/report.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).json({ message: "Backend working..." })
);
console.log("ENV CHECK",{
  Access_Key:process.env.AWS_ACCESS_KEY_ID,
  Secret_Key:process.env.AWS_SECRET_ACCESS_KEY
})
app.use("/upload", resumeRoutes);
app.use("/auth", authRoutes);
app.use("/report", Reportrouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on PORT", port);
});
