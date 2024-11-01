
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
const prompt = "use pricelist.json to check the mistake in invoice.jpg";
const imageParts = [
  //fileToGenerativePart("images/CompanyPrice.png", "image/png"),
  fileToGenerativePart("datafile/pricelist.json", "text/json"),
  fileToGenerativePart("images/invoice.jpg", "image/jpg"),
  ];
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