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
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Upload Your Videos</h1>
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="mb-4">
          <strong>AI Analysis:</strong> "{prompt}"
        </p>
        <p className="mb-6">
          No problem, Krish! I’ve got you covered. Just upload all your videos here, and I’ll take care of the rest.
        </p>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full text-white bg-gray-900 border border-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`px-6 py-2 rounded-lg ${
            isUploading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          } transition-colors`}
        >
          {isUploading ? 'Uploading...' : 'Upload and Analyze'}
        </button>
      </div>
    </div>
  );
};

export default FileUploadPage;
