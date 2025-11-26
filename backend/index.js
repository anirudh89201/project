import express from "express"
import cors from "cors"
import multer from "multer"
const app = express()
app.use(cors())
const upload = multer({dest:'uploads/'})
app.get("/",(req,res) => {
    return res.status(200).json({"message":"Okay Backend is working.."})
})
app.post("/upload",(req,res) => {
    console.log("Hii...")
    console.log(req.file)
    if(!resume){
        return res.status(404).json({"message":"Page not Found"})
    }
    return res.status(200).json({"message":"Resume got uploaded successfully"})
})
app.listen(3000,() => {
    console.log("Server listening on port 3000")
})