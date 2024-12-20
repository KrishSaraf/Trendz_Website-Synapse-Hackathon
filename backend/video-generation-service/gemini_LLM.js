// backend/video-generation-service/gemini_LLM.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  GoogleAIFileManager,
  FileState,
} = require("@google/generative-ai/server");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Adjust path to .env

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Instantiate models
const model_flash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const model_pro = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to upload a video file
async function uploadVideo(filePath) {
  try {
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: "video/mp4",
      displayName: "Uploaded Video",
    });

    // Log the response to check its structure
    console.log(
      `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    // Ensure we return the correct structure
    return {
      uri: uploadResponse.file.uri,
      mimeType: uploadResponse.file.mimeType,
      name: uploadResponse.file.name,
    };
  } catch (error) {
    throw new Error("Error uploading video: " + error.message);
  }
}

// Function to check the upload state of a video file
async function checkFileState(fileName) {
  try {
    let file = await fileManager.getFile(fileName);

    while (file.state === FileState.PROCESSING) {
      process.stdout.write("."); // Indicate processing
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds
      file = await fileManager.getFile(fileName); // Check state again
    }

    if (file.state === FileState.FAILED) {
      throw new Error("Video processing failed.");
    }

    console.log(
      `File ${file.displayName} is ready for inference as ${file.uri}`
    );
    return file.uri; // Return the URI for further processing
  } catch (error) {
    throw new Error("Error checking file state: " + error.message);
  }
}

// Function to analyze video content using the Pro model
// Define a function to analyze video content using the Pro model
async function analyzeVideo(videoFilePath, additionalData) {
  try {
    // Upload the video file using the File API
    const uploadResponse = await uploadVideo(videoFilePath); // Upload the video
    const fileUri = await checkFileState(uploadResponse.name); // Check if it's ready for inference

    // Generate content using text and the URI reference for the uploaded file.
    const instruction = `Analyze the following video input: "${fileUri}". Incorporate these details: "${additionalData}". 
        Please follow these steps:
        1. Identify key moments in the video.
        2. Suggest story outlines based on the content.
        3. Provide music suggestions that would fit the mood and theme of the video.
        4. Give editing suggestions to enhance the overall presentation.

        Return a detailed summary and insights based on these steps.`;

    const result = await model_pro.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.mimeType, // Access mimeType here
          fileUri: fileUri,
        },
      },
      { text: instruction },
    ]);

    return result.response.text(); // Return generated analysis
  } catch (error) {
    throw new Error("Error analyzing video: " + error.message);
  }
}

// Define a function to generate content using the model
async function generateContent(prompt) {
  try {
    const result = await model_flash.generateContent(prompt);
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

    const result = await model_flash.generateContent(instruction);
    return result.response.text(); // Return generated video script
  } catch (error) {
    throw new Error("Error generating video script: " + error.message);
  }
}

// Export the function for use in other files
module.exports = {
  generateContent,
  generateVideoScript,
  uploadVideo,
  checkFileState,
  analyzeVideo,
};
