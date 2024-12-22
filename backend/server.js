// Import required packages
const express = require("express");
const path = require("path");
const cors = require("cors"); // Import the cors package
require("dotenv").config(); // Load environment variables

// Import routes
const generateContentRoute = require("./routes/generate_prompt"); // Route for generating content
const analyzeVideoRoute = require("./routes/analyze_video"); // Route for analyzing video content
const trimVideoRoute = require("./routes/trim_video"); // Route for trimming videos

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle file uploads (for multipart/form-data)
app.use(express.urlencoded({ extended: true })); // To support URL-encoded bodies

// Mount routes
app.use("/api", generateContentRoute); // Mount the prompt generation route
app.use("/api/analyze-video", analyzeVideoRoute); // Mount the video analysis route
app.use("/api/trim-video", trimVideoRoute); // Mount the video trimming route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
