// Load environment variables from .env file
require("dotenv").config();

// Use dynamic import for ES Modules in CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Function to generate video
const generateVideo = async (prompt, ratio, imageUrl) => {
  // Accessing the API key from environment variables
  const apiKey = process.env.AIML_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please set AIML_API_KEY in your .env file."
    );
  }

  const response = await fetch(
    "https://api.aimlapi.com/v2/generate/video/runway/generation",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`, // Use the API key from .env
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "runway-gen3/turbo/image-to-video",
        prompt,
        ratio,
        image_url: imageUrl,
      }),
    }
  );

  const data = await response.json();
  return data;
};

module.exports = { generateVideo };
