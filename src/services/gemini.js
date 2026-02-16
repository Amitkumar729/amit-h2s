
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

import { validateImage } from './security';

export const analyzeImage = async (imageFile, userApiKey = null) => {
  validateImage(imageFile);
  const key = userApiKey || API_KEY;
  if (!key) throw new Error("API Key is missing. Please provide it in settings or .env");

  const ai = new GoogleGenerativeAI(key);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  try {
    const prompt = `Analyze this image. If this object were a video game monster, what would it be? 
    Return strictly a JSON object with this structure: 
    {
      "name": "Creative Name",
      "type": "Fire/Water/Steel/Psychic/etc",
      "hp": 1-100,
      "attack": 1-100,
      "defense": 1-100,
      "ability": "Name of special ability",
      "abilityDesc": "Description of what it does",
      "flavorText": "A short, witty bio about why this object is this monster."
    }
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

    // Convert file to base64
    const base64Data = await fileToGenerativePart(imageFile);

    const result = await model.generateContent([prompt, base64Data]);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown code blocks if Gemini adds them despite instructions
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

async function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type
        }
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
