import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScriptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || 'No prompt provided';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">AI-Generated Script</h1>
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Your Script</h2>
        <p className="text-sm mb-4">{`Based on your prompt: "${prompt}"`}</p>
        <p className="text-sm mb-2">
          Opening Scene: A dramatic shot of Kuala Lumpur's skyline...
        </p>
        <p className="text-sm mb-2">
          Key Sections: Petronas Towers, Batu Caves, and street food exploration...
        </p>
        <p className="text-sm mb-2">Ending: A cinematic montage with a call-to-action.</p>
        <button
          onClick={() => navigate('/result')}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition"
        >
          View Final Reel
        </button>
      </div>
    </div>
  );
};

export default ScriptPage;
