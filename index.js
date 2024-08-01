require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check if API_KEY is loaded correctly
if (!process.env.API_KEY) {
    console.error('API_KEY is not set in the environment variables');
    process.exit(1);
}

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

async function run() {
    try {
        // Create a model instance
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", 
            generationConfig 
        });

        const prompt = "Write a story about a magic backpack.";

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.error('Error during content generation:', error.message);
    }
}

run();
