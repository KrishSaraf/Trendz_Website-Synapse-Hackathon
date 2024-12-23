import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScriptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || "No prompt provided";

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const loadingSteps = [
      "Extracting key insights...",
      "Structuring the script...",
      "Finalizing your AI-generated script...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < loadingSteps.length) {
        setLoadingMessage(loadingSteps[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsLoading(false); // End loading after all steps
      }
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex items-center justify-center px-4">
      {isLoading ? (
        // Loading Screen
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Creating Your Script</h1>
          <p className="text-lg mb-4">{loadingMessage}</p>
          <div className="w-16 h-16 border-t-4 border-blue-500 border-opacity-75 rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        // Script Display
        <div className="bg-gray-800/70 p-8 rounded-lg shadow-xl text-left w-full max-w-3xl">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 mb-6">
            AI-Generated Script
          </h1>
          <h2 className="text-3xl font-semibold mb-6">Your Reel Structure</h2>

          {/* Reel Structure */}
          <div className="space-y-6">
            {/* Hook */}
            <div>
              <h3 className="text-2xl font-bold mb-2">1. Hook (First 3 Seconds)</h3>
              <p className="text-gray-200 mb-2">
                <strong>Timestamp:</strong> 0:00 - 0:03 (Video 3)
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dramatic shot of Bungee Jumping.</li>
                <li>Suggestion: Add sound effect.</li>
                <li>Clip ends abruptly to catch attention.</li>
              </ul>
            </div>

            {/* Section 1: Travelling */}
            <div>
              <h3 className="text-2xl font-bold mb-2">2. Section 1: Travelling</h3>
              <p className="text-gray-200 mb-2">
                <strong>Timestamp:</strong> 0:04 - 0:11
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A scenic shot of traveling across a bridge, with water on both sides.</li>
                <li>
                  The narrator introduces himself and his friends on a bus, capturing the cozy
                  atmosphere as rain gently taps against the bus windows.
                </li>
                <li>
                  A panoramic view of the Kuala Lumpur skyline with the Patronas Tower, likely
                  filmed from their hotel room.
                </li>
              </ul>
            </div>

            {/* Section 3: Batu Caves */}
            <div>
              <h3 className="text-2xl font-bold mb-2">3. Section 3: Batu Caves</h3>
              <p className="text-gray-200 mb-2">
                <strong>Timestamp:</strong> 0:12 - 0:21
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Smooth transition to Batu Caves showcasing colorful steps and vibrant surroundings.</li>
                <li>View from bottom of stairs looking above to the hundreds of stairs yet to climb.</li>
                <li>View from the top of the stairs after climbing.</li>
                <li>View inside the Batu Caves at the top.</li>
              </ul>
            </div>
          </div>

          {/* Extra Suggestions */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-2">Extra Suggestions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Music Pairing:</strong> Use a trending upbeat track for Instagram Reels to
                keep the audience hooked.
                <br />
                <span className="text-gray-300">Example: Pumped Up Kicks by Foster the People.</span>
              </li>
              <li>
                <strong>Transitions:</strong> Incorporate smooth zoom-ins and fade-outs for a polished
                look.
              </li>
              <li>
                <strong>Captions:</strong> Highlight the key locations (Petronas Towers, Batu Caves).
              </li>
            </ul>
          </div>

          {/* Navigate to Result Page */}
          <button
            onClick={() => navigate("/result")}
            className="mt-8 w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold text-lg transition"
          >
            View Final Reel
          </button>
        </div>
      )}
    </div>
  );
};

export default ScriptPage;
