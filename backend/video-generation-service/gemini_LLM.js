// backend/video-generation-service/gemini_LLM.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Adjust path to .env

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define a function to generate content using the model
async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Return generated content
  } catch (error) {
    throw new Error("Error generating content: " + error.message);
  }
}

// Define a function to generate a video script using the model
async function generateVideoScript(userPrompt, additionalData) {
  try {
    // Create an instruction for the LLM to generate a video script
    const instruction = `Based on the following user prompt: "${userPrompt}" and these additional details: "${additionalData}", please create a detailed video script. The script should include an introduction, main content, and a conclusion.`;

    const result = await model.generateContent(instruction);
    return result.response.text(); // Return generated video script
  } catch (error) {
    throw new Error("Error generating video script: " + error.message);
  }
}

// Export the function for use in other files
module.exports = { generateContent, generateVideoScript };
