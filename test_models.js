import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBHMNlRkG62PGaI6jp8HWHlYr5aEfwO7xc"; // Use env variable in prod

async function listModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("Testing with key:", API_KEY);

    // Try fallback to gemini-pro-vision if flash fails
    const toTry = ["gemini-1.5-flash-latest", "gemini-1.5-flash-001", "gemini-pro-vision"];

    for (const m of toTry) {
        const model = genAI.getGenerativeModel({ model: m });
        try {
            console.log(`Pinging ${m}...`);
            // We can't really "ping" without generating content, but let's try a safe prompt
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log(`SUCCESS: ${m} responded: ${response.text().substring(0, 20)}...`);
        } catch (e) {
            console.log(`FAIL: ${m} => ${e.message.split('[')[0]}`);
        }
    }
}

listModels();
