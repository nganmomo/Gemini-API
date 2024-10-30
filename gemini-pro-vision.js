
//tested
import dotenv from 'dotenv';
import * as fs from "fs";
import {GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const genAI = new GoogleGenerativeAI (process.env.API_KEY);
function fileToGenerativePart(path, mimeType) {
return {
    inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"), 
        mimeType,
    },
    };
}    
async function run() {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "";
const imageParts = [fileToGenerativePart("pythagoras.jpg", "image/jpeg")];
const result = await model.generateContent([prompt, ...imageParts]); const response = await result.response;
const text = response.text();
console.log(text);
}

run();