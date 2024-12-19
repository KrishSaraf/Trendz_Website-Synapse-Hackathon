// Import required packages
const express = require("express");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Import routes
const generateContentRoute = require("./routes/generate_prompt"); // Adjust path to your routes

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the generate content route
app.use("/api", generateContentRoute); // Mount the route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
