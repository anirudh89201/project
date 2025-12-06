import { Assemblyclient} from "../config/assemblyClient.js";
import { Readable } from "stream";
import { openaiClient } from "../config/openaiClient.js";

export const getReport = async (audioFile, Question) => {
  try {
    console.log("Received file:", audioFile,"Question:",Question);
    // Convert multer buffer → stream
    const audioStream = Readable.from(audioFile.buffer);
    const transcript = await Assemblyclient.transcripts.transcribe({
      audio:audioStream,
      disfluencies:true
    })

    if(transcript.status === "error"){
      console.error("Transcription failed",transcript.error)
      return;
    }
    const text = transcript.text
    console.log(text)
    if(text.length == 0){
      throw new Error("Internal Server Error during processing of recording")
    }
    const response = await generateReport(text,Question)
    console.log(response)
  } catch (error) {
    console.log("Error:", error);
  }
};
export const generateReport = async (text, fillerWords, question) => {
  const prompt = `
You evaluate spoken English. Give a short, crisp JSON report. 
Keep all fields brief and easy to read on a phone screen.

INPUT:
Question: ${question}
Transcript: ${text}

Return ONLY this JSON format:

{
  "scores": {
    "fluency": number (0-10),
    "vocabulary": number (0-10),
    "grammar": number (0-10),
    "confidence": number (0-10),
    "topic_coverage": number (0-10),
    "overall": number (0-100)
  },
  "filler_feedback": "1–2 lines on how they used filler words and quick tips",
  "grammar_issues": "Max 2 short grammar corrections",
  "vocabulary_suggestions": "1–2 better words they should use",
  "topic_tips": "1–2 lines about what to add to sound confident",
  "improved_answer": "Rewrite answer in 2–3 short sentences, natural and confident"
}
`;


  const response = await openaiClient.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "You evaluate spoken English and generate detailed reports." },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
};

