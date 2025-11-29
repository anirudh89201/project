import { Readable } from "stream";
import { openaiClient } from "../config/openaiClient.js";

export const getReport = async (audioFile) => {
    console.log("Received file:", audioFile);

    const audioStream = Readable.from(audioFile.buffer);

    const transcription = await openaiClient.audio.transcriptions.create({
        file: audioStream,
        model: 'whisper-1',
        filename: audioFile.originalname,
    });

    const text = transcription.text;
    console.log("Text is:", text);

    return text; // optionally return the transcription
};
