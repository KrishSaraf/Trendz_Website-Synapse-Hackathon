import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const prompt = location.state?.prompt || 'No prompt provided';

  useEffect(() => {
    const analysisSteps = [
      'Analyzing your video...',
      'Extracting key moments...',
      'Generating a reel structure...',
      'Suggestions for improvements...',
      'Finalizing the analysis...',
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
    navigate('/script', { state: { prompt } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Analyzing Your Content</h1>
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full max-w-md">
        {messages.map((msg, index) => (
          <p key={index} className="text-sm mb-2">{msg}</p>
        ))}
        {isLoading && <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>}
        {!isLoading && (
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition"
          >
            View AI Script
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
