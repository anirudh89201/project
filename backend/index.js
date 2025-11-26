import express from "express"
import cors from "cors"
import multer from "multer"
import OpenAI from "openai"
import { readFile } from 'node:fs/promises';
import { PDFParse } from "pdf-parse"
import dotenv from "dotenv"
dotenv.config()
const client = new OpenAI({ 
    apiKey:process.env.OPENAI_KEY
});
const app = express()
app.use(cors())
const upload = multer({storage:multer.memoryStorage()})
app.get("/",(req,res) => {
    return res.status(200).json({"message":"Okay Backend is working.."})
})
app.post("/upload",upload.single('resume'),async(req,res) => {
    console.log("Hii...")
    if(!req.file){
        return res.status(404).json({"message":"Page not Found"})
    }
    try{
        const parser = new PDFParse({data:req.file.buffer})
        const result = await parser.getText();
        if(result){
            console.log(result)
            const response = await client.chat.completions.create({
                model:"gpt-4-turbo",
                messages:[
                    {
                        "role":"system",
                        "content":"You are an expert HR who summarizes resumes and extract the skills, experience, education, and strengths."
                    },
                    {
                        "role":"user",
                        "content":result.text
                    }
                ],
                max_tokens:1000
            })     
            console.log(response.choices[0].message.content)
            return res.status(200).json({
                success:true,
                summary:response.choices[0].message.content
            })
        }
       
    }catch(error){
        console.log(JSON.stringify(error))
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }finally{
        console.log("Upload Route executed..")
    }
        })
app.listen(3000,() => {
    console.log("Server listening on port 3000")
})