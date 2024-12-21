import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar_1 from '../Assets/Images/Avatar_1.webp';
import Avatar_2 from '../Assets/Images/Avatar_2.png';
import Avatar_3 from '../Assets/Images/Avatar_3.webp';
import Avatar_4 from '../Assets/Images/Avatar_4.webp';

const AvatarPage = () => {
  const navigate = useNavigate();
  const [avatarIndex, setAvatarIndex] = useState(0); // Index to track which avatar to show
  const [isLoading, setIsLoading] = useState(true); // Controls the loading state

  // Avatar images
  const avatars = [Avatar_1, Avatar_2,Avatar_3,Avatar_4]; // Array of imported avatar images

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 10000); // Simulated loading time (2 seconds)

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Handle Regenerate Button
  const handleRegenerate = () => {
    setIsLoading(true); // Show the loading spinner
    setTimeout(() => {
      setAvatarIndex((prevIndex) => (prevIndex + 1) % avatars.length); // Cycle to the next avatar
      setIsLoading(false); // Stop loading spinner
    }, 5000); // Simulated loading time (2 seconds)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black flex flex-col items-center justify-center text-white">
      {isLoading ? (
        // Loading Screen
        <div className="text-center">
          <div className="mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Loading Your Avatar...</h1>
          <p className="text-gray-400">Please wait while your avatar is being prepared.</p>
        </div>
      ) : (
        // Avatar Display
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-6">Your Generated Avatar</h1>
          <div className="mb-6">
            <img
              src={avatars[avatarIndex]} // Dynamically load the avatar based on index
              alt={`Avatar ${avatarIndex + 1}`}
              className="rounded-lg shadow-md w-64 h-64 object-cover mx-auto"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            {/* Regenerate Button */}
            <button
              onClick={handleRegenerate}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
            >
              Regenerate Avatar
            </button>

            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPage;
