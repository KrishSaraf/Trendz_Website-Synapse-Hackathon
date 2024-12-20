// Import required packages
const express = require("express");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Import routes
const generateContentRoute = require("./routes/generate_prompt"); // Route for generating content
const analyzeVideoRoute = require("./routes/analyze_video"); // Route for analyzing video content

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle file uploads (for multipart/form-data)
app.use(express.urlencoded({ extended: true })); // To support URL-encoded bodies

// Use the generate content route
app.use("/api", generateContentRoute); // Mount the prompt generation route
app.use("/api/analyze-video", analyzeVideoRoute); // Mount the video analysis route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
