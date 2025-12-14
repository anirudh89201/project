import { Assemblyclient} from "../config/assemblyClient.js";
import { Readable } from "stream";
import { openaiClient } from "../config/openaiClient.js";

export const getReport = async (audioFile, Question) => {
  try {
    if (!audioFile || !audioFile.buffer.length) {
      throw new Error("Audio file missing");
    }

    const audioStream = Readable.from(audioFile.buffer);
    const transcript = await Assemblyclient.transcripts.transcribe({
      audio: audioStream,
      disfluencies: true
    });

    if (!transcript || transcript.status === "error") {
      throw new Error(`Transcription failed: ${transcript?.error || "Unknown error"}`);
    }

    const text = transcript.text;
    if (!text || text.length < 10) {
      throw new Error("No speech detected. Please speak clearly into the microphone");
    }

    const response = await generateReport(text, Question);
    return response;

  } catch (error) {
    console.error("getReport error:", error.message);
    throw error;  // bubble up to handleUpload
  }
};

export const generateReport = async (text, question) => {
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

