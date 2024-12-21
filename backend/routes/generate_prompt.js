const express = require("express");
const {
  generateContent,
  generateVideoScript,
} = require("../video-generation-service/gemini_LLM"); // Adjust path to gemini_LLM
const { generateVideo } = require("../video-generation-service/aiml_LLM"); // Adjust path to videoService
const router = express.Router();

// Route to generate content
router.post("/generate-content", async (req, res) => {
  const prompt = req.body.prompt; // Get prompt from request body

  if (!prompt) {
    return res
      .status(400)
      .json({ success: false, message: "Prompt is required." });
  }

  try {
    const generatedText = await generateContent(prompt); // Call the imported function
    res.json({
      success: true,
      message: "Content generated successfully!",
      data: generatedText, // Include the generated content
    });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate content.",
      error: error.message,
    });
  }
});

// Route to generate video script
router.post("/generate-videoscript", async (req, res) => {
  const userPrompt = req.body.prompt; // Get user prompt from request body
  const additionalData = req.body.additionalData; // Get additional data from request body

  if (!userPrompt || !additionalData) {
    return res.status(400).json({
      success: false,
      message: "Both prompt and additional data are required.",
    });
  }

  try {
    const generatedText = await generateVideoScript(userPrompt, additionalData); // Call the imported function with both parameters
    res.json({
      success: true,
      message: "Enhanced prompt generated successfully!",
      data: generatedText, // Include the enhanced content
    });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate content.",
      error: error.message,
    });
  }
});

// Route to generate video
router.post("/generate-video", async (req, res) => {
  const { prompt, ratio, imageUrl } = req.body;

  if (!prompt || !ratio) {
    return res
      .status(400)
      .json({ success: false, message: "Prompt and ratio are required." });
  }

  try {
    const videoResponse = await generateVideo(prompt, ratio, imageUrl); // Call the video generation service
    res.json({
      success: true,
      message: "Video generated successfully!",
      data: videoResponse, // Include the video generation response
    });
  } catch (error) {
    console.error("Error generating video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate video.",
      error: error.message,
    });
  }
});

module.exports = router; // Export the router
