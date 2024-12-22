import React, { useState, useEffect, useRef } from "react";
import "./VideoEditor.css";
import { Scissors } from "lucide-react";
import sentosaVideo from "../Assets/sentosa_video.mp4"; // Import the local video file

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
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      setEndTime(videoRef.current.duration || 0);
    }
  }, [videoRef.current?.duration]);

  const handleVideoLoaded = () => {
    setDuration(videoRef.current.duration);
    setEndTime(videoRef.current.duration);
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
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) {
      alert("Please enter a prompt before sending.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-content",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: chatInput }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch AI response.");

      const data = await response.json();
      if (data.success) {
        setChatResponse(data.data || "No detailed response received.");
      } else {
        setChatResponse(data.message || "Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatResponse("Error fetching response. Please try again.");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-4 gap-8">
        {/* Script Panel */}
        <div className="col-span-1 bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg">
          <h2 className="text-xl font-bold mb-4">Script</h2>
          <ul className="space-y-4">
            <li className="bg-gray-900 p-3 rounded-lg">[SCRIPT PLACEHOLDER]</li>
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
                  width="750"
                  height="500"
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
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-lg">
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
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
                size={24}
              />
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span>Start: {startTime.toFixed(1)}s</span>
              <span>End: {endTime.toFixed(1)}s</span>
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
          <h2 className="text-xl font-bold mb-4">AI Chat</h2>
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask AI..."
            className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleChatSubmit}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center"
          >
            Send
          </button>
          {chatResponse && (
            <div className="mt-4 bg-gray-700 rounded-lg p-4">
              <p>{chatResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
