import { AssemblyAI, FileService, TranscriptService } from "assemblyai";
import dotenv from "dotenv"
dotenv.config();
export const Assemblyclient = new AssemblyAI({
    apiKey:process.env.assemblyAPI_KEY
})
export const fileService = Assemblyclient.files;
export const transcriptService = Assemblyclient.transcripts;