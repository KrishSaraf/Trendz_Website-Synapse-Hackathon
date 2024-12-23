import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FileUploadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || 'No prompt provided';
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert('Please upload at least one file!');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      navigate('/analysis', { state: { prompt, files } }); // Pass prompt and files to the next page
    }, 3000); // Simulate 3 seconds of file upload
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-4">
      {/* AI Message */}
      <div className="mb-6 w-full max-w-3xl text-center">
        <div className="bg-blue-500/80 p-4 rounded-t-lg shadow-md inline-block relative">
          <p className="text-lg font-medium text-white">
            No problem, Krish! I’ve got you covered. Just upload all your videos here, and I’ll take care of the rest.
          </p>
          {/* AI Label */}
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-full shadow-lg">
            AI Assistant
          </span>
        </div>
        <div className="bg-blue-500 h-4 w-4 transform rotate-45 translate-y-[-2px] mx-auto"></div>
      </div>

      {/* Card Container */}
      <div className="bg-gray-800/70 p-10 rounded-lg shadow-2xl text-center w-full max-w-3xl relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-500 to-purple-800 blur-3xl opacity-40 -z-10"></div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 mb-8 animate-fade-in">
          Upload Your Videos
        </h1>

        {/* File Upload Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg shadow-md mb-6">
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-white bg-gray-900 border border-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 mb-4"
          />
          {files.length > 0 && (
            <p className="text-gray-300 text-sm mb-2">
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`w-full px-6 py-3 rounded-lg text-white font-semibold text-lg ${
            isUploading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload and Analyze'}
        </button>
      </div>
    </div>
  );
};

export default FileUploadPage;
