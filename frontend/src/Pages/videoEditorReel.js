import React, { useState, useEffect, useRef } from "react";
import "./VideoEditor.css";
import { Scissors } from "lucide-react";
import sentosaVideo from "../Assets/FinalReel.mp4"; // Import the local video file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const VideoEditor = () => {
  const [videoUrl, setVideoUrl] = useState(sentosaVideo); // Use the imported video as the default URL
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicUrl, setMusicUrl] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
  const [showTools, setShowTools] = useState(false);
  const videoRef = useRef(null);

  const location = useLocation();
  const { script } = location.state || { script: "" }; // Default to empty string if no state

  useEffect(() => {
    if (videoRef.current) {
      setEndTime(videoRef.current.duration || 0);
    }
  }, [videoRef.current?.duration]);

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const newDuration = videoRef.current.duration;

      setDuration(newDuration);
      setStartTime(0); // Reset start time to 0
      setEndTime(newDuration); // Set end time to the new duration

      toast.success("Video loaded successfully!");
    }
  };

  const handleMouseDown = (type) => {
    setIsDragging(true);
    setDragType(type);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragType) return;

    const rect = document.querySelector(".trim-bar").getBoundingClientRect();
    const position = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const newTime = (position / rect.width) * duration;

    if (dragType === "start" && newTime < endTime) {
      setStartTime(newTime);
    } else if (dragType === "end" && newTime > startTime) {
      setEndTime(newTime);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMusicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMusicUrl(URL.createObjectURL(file));
      toast.success("Music uploaded successfully!");
    } else {
      toast.error("No file selected for upload.");
    }
  };

  const handleChatSubmit = async () => {
    const video_prompt =
      "Right now pretend you are a video analyzer giving me advice on how to edit my video, this video is a ten second instagram reel showing me enjoying  a poke bowl at sentosa beach, try your best to answer to my question. Also, give me time stamps from 0 - 2 seconds and etc. My question:" +
      chatInput +
      "This the video script " +
      script;
    if (!chatInput.trim()) {
      toast.error("Please enter a prompt before sending.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-content",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: video_prompt }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch AI response.");

      const data = await response.json();
      if (data.success) {
        setChatResponse(data.data || "No detailed response received.");
        toast.success("AI response generated successfully!");
      } else {
        setChatResponse(data.message || "Unexpected response format.");
        toast.warning("Unexpected response received.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatResponse("Error fetching response. Please try again.");
      toast.error("Error generating AI response.");
    }
  };

  const handleTrimVideo = async () => {
    try {
      const videoFile = await fetch(videoUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);

      const response = await fetch("http://localhost:5000/api/trim-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to trim video");
      }

      const trimmedVideoBlob = await response.blob();
      const trimmedVideoURL = URL.createObjectURL(trimmedVideoBlob);
      setVideoUrl(trimmedVideoURL); // Update video URL

      toast.success("Video trimmed successfully!");

      // Trigger metadata reload by resetting the video element
      if (videoRef.current) {
        videoRef.current.load(); // Reload video element
      }
    } catch (error) {
      console.error("Error trimming video:", error);
      toast.error("Error trimming video. Please try again.", {
        autoClose: 5000,
      });
    }
  };

  const toggleTools = () => {
    setShowTools((prev) => !prev);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-4 gap-8">
        {/* Script Panel */}
        <div className="col-span-1 bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg">
          <h2 className="text-xl font-bold mb-4">Script</h2>
          <ul className="space-y-4">
            <li className="bg-gray-900 p-3 rounded-lg">
              {script || "No script available."}
            </li>
          </ul>
        </div>

        {/* Video and Music Panel */}
        <div className="col-span-3 space-y-8">
          {/* Video Player */}
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg">
            <h2 className="text-xl font-bold mb-4">Video Preview</h2>
            {videoUrl ? (
              <div className="flex justify-center">
                <video
                  ref={videoRef}
                  width= "25%"
                  controls
                  onLoadedMetadata={handleVideoLoaded}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                No video loaded. Please provide a URL.
              </div>
            )}
          </div>

          {/* Trim Bar */}
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg relative">
            <h2 className="text-xl font-bold mb-4">Trim Video</h2>
            <div className="relative trim-bar w-full h-16 bg-gray-700 rounded-lg">
              {/* Timeline */}
              <div className="absolute inset-0 flex items-center">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{
                    left: `${(startTime / duration) * 100}%`,
                    width: `${((endTime - startTime) / duration) * 100}%`,
                    position: "absolute",
                  }}
                ></div>
              </div>
              {/* Start Marker */}
              <div
                className="absolute top-0 -translate-x-1/2 w-4 h-16 bg-white cursor-pointer"
                style={{ left: `${(startTime / duration) * 100}%` }}
                onMouseDown={() => handleMouseDown("start")}
              ></div>
              {/* End Marker */}
              <div
                className="absolute top-0 -translate-x-1/2 w-4 h-16 bg-white cursor-pointer"
                style={{ left: `${(endTime / duration) * 100}%` }}
                onMouseDown={() => handleMouseDown("end")}
              ></div>
              {/* Scissors Icon */}
              <Scissors
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                size={24}
                onClick={handleTrimVideo} // Trigger trim function on click
              />
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span>Start: {startTime.toFixed(1)}s</span>
              <span>End: {endTime.toFixed(1)}s</span>
            </div>

            {/* More Tools Dropdown */}
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                onClick={toggleTools}
              >
                More Tools
              </button>
              {showTools && (
                <div
                  className="absolute mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-48 z-50"
                  style={{ right: 0 }}
                >
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Merge Clips
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Transition Effects
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Title Creator
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Subtitle Generator
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Music Panel */}
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg">
            <h2 className="text-xl font-bold mb-4">Background Music</h2>
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-500 transition-colors">
              {musicUrl ? (
                <audio src={musicUrl} controls className="w-full" />
              ) : (
                <>
                  <label
                    htmlFor="music-upload"
                    className="mt-2 block text-sm text-gray-400 cursor-pointer"
                  >
                    Upload music
                  </label>
                  <input
                    type="file"
                    id="music-upload"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleMusicUpload}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* AI Chat Panel */}
        <div className="col-span-4 bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg">
          <h2 className="text-xl font-bold mb-4">AI Content Assistant</h2>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 rounded-lg bg-gray-900 text-white"
              rows="3"
              placeholder="Type a prompt for AI..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            ></textarea>
            <button
              onClick={handleChatSubmit}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
            >
              Generate Response
            </button>
            <div
              className="p-3 bg-gray-900 rounded-lg text-white whitespace-pre-wrap"
              style={{ minHeight: "100px" }}
            >
              {chatResponse || "Your AI response will appear here."}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VideoEditor;
