import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PromptPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisMessage('Analyzing your prompt...');
    setTimeout(() => {
      setAnalysisMessage(
        "No problem, Krish! I’ve got you covered. Just upload all your videos here, and I’ll take care of the rest."
      );
      setTimeout(() => {
        navigate('/file-upload', { state: { prompt } }); // Pass prompt to the next page
      }, 3000); // Wait 3 seconds before redirecting
    }, 2000); // Simulate 2 seconds of prompt analysis
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Enter Your Prompt</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="4"
          className="block w-full text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Describe the content you want to create..."
        ></textarea>
        <button
          type="submit"
          disabled={isAnalyzing}
          className={`px-6 py-2 rounded-lg ${
            isAnalyzing ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          } transition-colors`}
        >
          {isAnalyzing ? 'Analyzing...' : 'Submit'}
        </button>
      </form>
      {analysisMessage && (
        <div className="mt-4 bg-gray-700 text-white p-4 rounded-lg shadow-md">
          <p>{analysisMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PromptPage;
