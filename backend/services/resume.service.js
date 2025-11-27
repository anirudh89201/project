import {PDFParse} from "pdf-parse";
import { sanitizeText } from "../constants/sanitizeResult.js";
import { openaiClient } from "../config/openaiClient.js";

export const uploadResume = async (file) => {
    const parser = new PDFParse({ data: file.buffer });
    const result = await parser.getText();
    const PDFText = sanitizeText(result.text);

    const response = await openaiClient.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content: `
                You are an expert HR who summarizes resumes. 
                Extract the following details in JSON format: skills, experience, education, strengths, and interviewQuestions.
                Ignore personal identifiers such as name, phone, email, and URLs. 
                Return only valid JSON with the following keys: 
                - skills
                - experience
                - education
                - strengths
                - interviewQuestions (a list of questions you would ask in an interview based on the candidate's profile)
                `
            },
            {
                role: "user",
                content: PDFText
            }
        ],
        max_tokens: 1000
    });

    return response.choices[0].message.content;
};
