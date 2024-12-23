import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const loadingSteps = [
      "Video Creating Engine is initializing...",
      "Stitching parts from different videos...",
      "Finalizing your reel...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < loadingSteps.length) {
        setLoadingMessage(loadingSteps[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsLoading(false); // Stop loading after all steps
      }
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleEditVideo = () => {
    navigate("/video-editing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex items-center justify-center px-4">
      {isLoading ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Creating Your Reel</h1>
          <p className="text-lg mb-4">{loadingMessage}</p>
          <div className="w-16 h-16 border-t-4 border-blue-500 border-opacity-75 rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <div className="bg-gray-800/70 p-6 rounded-lg shadow-xl text-center w-full max-w-lg relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-500 to-purple-800 blur-3xl opacity-40 -z-10"></div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 mb-6">
            Your Final Reel
          </h1>

          {/* Video Player */}
          <div className="w-full max-w-xs mx-auto bg-black rounded-lg overflow-hidden">
            <video
              src={require("../Assets/FinalReel.mp4")}
              controls
              className="w-full max-h-64 object-contain" // Set max height
            ></video>
          </div>



          {/* Navigate to Video Editing */}
          <button
            onClick={handleEditVideo}
            className="w-full mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold text-md transition"
          >
            Edit Your Reel
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
