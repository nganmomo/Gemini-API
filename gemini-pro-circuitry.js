
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
const prompt = "find out VOUT in the circuit";
//const imageParts = [fileToGenerativePart("pythagoras.jpg", "image/jpeg")];
const imageParts = [fileToGenerativePart("images/LM317.png", "image/png")];
const result = await model.generateContent([prompt, ...imageParts]); const response = await result.response;
const text = response.text();
try {
    fs.writeFileSync('images/testfile', text, 'utf8');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
console.log(text);
}

run();