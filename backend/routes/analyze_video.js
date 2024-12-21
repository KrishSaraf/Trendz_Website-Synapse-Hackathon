// routes/analyzeVideo.js
const express = require("express");
const multer = require("multer");
const { analyzeVideo } = require("../video-generation-service/gemini_LLM"); // Adjust path as necessary
const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// Route to analyze video content
router.post("/", upload.single("videoFile"), async (req, res) => {
  const videoFilePath = req.file.path; // Get the path of the uploaded video file
  const additionalData = req.body.additionalData; // Get additional data from request body

  if (!videoFilePath || !additionalData) {
    return res.status(400).json({
      success: false,
      message: "Both video file and additional data are required.",
    });
  }

  try {
    const analysisResult = await analyzeVideo(videoFilePath, additionalData); // Analyze the uploaded video
    res.json({
      success: true,
      message: "Video analysis completed successfully!",
      data: analysisResult, // Include generated analysis
    });
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to analyze video.",
      error: error.message,
    });
  }
});

module.exports = router; // Export the router
