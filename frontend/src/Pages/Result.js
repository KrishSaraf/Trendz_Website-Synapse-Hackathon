import React from 'react';

const ResultPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Your Final Reel</h1>
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <video
          src="/path/to/static/reel.mp4"
          controls
          className="w-full rounded-lg shadow-md"
        ></video>
        <a
          href="/path/to/static/reel.mp4"
          download
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition block text-center"
        >
          Download Reel
        </a>
      </div>
    </div>
  );
};

export default ResultPage;
