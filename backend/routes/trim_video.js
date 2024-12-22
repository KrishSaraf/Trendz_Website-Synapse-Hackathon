const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
// Set the FFmpeg executable path
ffmpeg.setFfmpegPath("C:/ffmpeg-2024-12-19-essentials_build/bin/ffmpeg.exe");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary directory for uploaded files

router.post("/", upload.single("video"), (req, res) => {
  const { startTime, endTime } = req.body;
  const inputPath = req.file.path; // Uploaded video path
  const outputDir = path.join(__dirname, "../outputs");
  const outputPath = path.join(outputDir, `trimmed_${Date.now()}.mp4`);

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Use FFmpeg to trim the video
  ffmpeg(inputPath)
    .setStartTime(startTime) // Start time in seconds
    .setDuration(endTime - startTime) // Duration in seconds
    .output(outputPath)
    .on("end", () => {
      console.log("Video trimming completed:", outputPath);
      res.sendFile(outputPath, () => {
        // Clean up temporary files
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on("error", (err) => {
      console.error("Error trimming video:", err);
      res.status(500).json({ error: "Failed to trim video" });
      fs.unlinkSync(inputPath); // Clean up uploaded file on error
    })
    .run();
});

module.exports = router;
