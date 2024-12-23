import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PromptPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }

    setIsAnalyzing(true); // Show the analyzing state
    setTimeout(() => {
      navigate('/file-upload', { state: { prompt } }); // Redirect to file-upload after 3 seconds
    }, 3000); // Simulated 3 seconds of prompt analysis
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-black text-white flex items-center justify-center px-4">
      {/* Card Container */}
      <div className="bg-gray-800/70 p-10 rounded-lg shadow-2xl text-center w-full max-w-3xl relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-500 to-purple-800 blur-3xl opacity-40 -z-10"></div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 mb-8 animate-fade-in">
          Enter Your Prompt
        </h1>

        {/* Prompt Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="6"
            className="w-full px-5 py-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-lg"
            placeholder="Describe the content you want to create..."
          ></textarea>
          <button
            type="submit"
            disabled={isAnalyzing}
            className={`w-full px-6 py-4 rounded-lg text-white font-semibold text-lg ${
              isAnalyzing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Submit'}
          </button>
        </form>

        {/* Loading Message */}
        {isAnalyzing && (
          <div className="mt-8 p-5 bg-gray-700/70 rounded-lg shadow-md animate-slide-in">
            <p className="text-xl text-gray-200">
              Analyzing your prompt !!!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptPage;
