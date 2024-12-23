import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const prompt = location.state?.prompt || "No prompt provided";

  useEffect(() => {
    const analysisSteps = [
      "Analyzing your video...",
      "Extracting key moments...",
      "Generating a reel structure...",
      "Suggestions for improvements...",
      "Finalizing the analysis...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, analysisSteps[index]]);
      index++;
      if (index === analysisSteps.length) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 1500); // Add a message every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    navigate("/script", { state: { prompt } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 mb-6">
        Analyzing Your Content
      </h1>
      <div className="bg-gray-800/70 p-8 rounded-lg shadow-xl text-left w-full max-w-3xl">
        {messages.map((msg, index) => (
          <p key={index} className="text-lg mb-4">
            {msg}
          </p>
        ))}

        {isLoading && (
          <div className="mt-6 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <div className="mt-6 space-y-6">
            {/* Results */}
            <div className="text-lg">
              <p className="font-bold text-xl mb-4">
                Here’s what I found in your videos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Video 1: Petronas Towers – Daytime shots with panoramic views.</li>
                <li>Video 2: Batu Caves – Climbing steps with vibrant surroundings.</li>
                <li>Video 3: Sunway Lagoon - Activities - Bungee Jumping.</li>
                <li>Video 4: Travelling across a bridge.</li>
                <li>Video 5: Evening Skyline – KL Tower illuminated at night.</li>
                <li>Video 6: Batu Caves - Inside the caves on the top of the stairs.</li>
                <li>Video 7: 3 friends travelling in a bus while it’s raining outside.</li>
                <li>Video 8: Patronas Towers in the Kuala Lumpur skyline in Nighttime.</li>
              </ul>
            </div>

            {/* Reel Structure Suggestion */}
            <div className="text-lg">
              <p className="font-bold text-xl mb-4">
                Next up:
              </p>
              <p>
                Based on the videos you provided, I’ve analyzed the content and
                suggest creating your 25-second reel in the following order. The
                timestamps highlight the most engaging and relevant portions of
                your videos to ensure a smooth flow, hooks the audience, and aligns
                with trending formats.
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition"
            >
              View AI Script
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
