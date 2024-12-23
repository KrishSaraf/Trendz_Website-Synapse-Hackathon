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
  const [loadingStep, setLoadingStep] = useState(0); // Tracks which step of loading is active

  // Avatar images
  const avatars = [Avatar_1, Avatar_2, Avatar_3, Avatar_4]; // Array of imported avatar images

  useEffect(() => {
    // Define loading steps with different durations
    const steps = [
      { message: 'Understanding your style...', duration: 3000 },
      { message: 'Saving your preferences...', duration: 2000 },
      { message: 'Creating your avatar...', duration: 5000 },
    ];

    let stepIndex = 0;
    const loadStep = () => {
      if (stepIndex < steps.length) {
        setLoadingStep(stepIndex); // Update the current loading step
        setTimeout(() => {
          stepIndex++;
          loadStep();
        }, steps[stepIndex].duration);
      } else {
        setIsLoading(false); // End loading process
      }
    };

    loadStep();
  }, []);

  // Handle Regenerate Button
  const handleRegenerate = () => {
    setIsLoading(true); // Show the loading spinner
    setLoadingStep(0); // Reset loading steps
    setTimeout(() => {
      setAvatarIndex((prevIndex) => (prevIndex + 1) % avatars.length); // Cycle to the next avatar
      setIsLoading(false); // Stop loading spinner
    }, 5000); // Simulated loading time for regeneration
  };

  // Loading messages for each step
  const loadingMessages = [
    'Understanding your style...',
    'Saving your preferences...',
    'Creating your avatar...',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black flex items-center justify-center text-white">
      {isLoading ? (
        // Loading Screen
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            </div>
            <h1 className="text-2xl font-semibold mb-4">{loadingMessages[loadingStep]}</h1>
            <p className="text-gray-400">Please wait...</p>
          </div>
        </div>
      ) : (
        // Avatar Display
        <div className="bg-gray-900/70 p-8 rounded-lg shadow-xl text-center relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-50 blur-2xl rounded-lg"></div>

          {/* Avatar */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-6">Your Generated Avatar</h1>
            <div className="mb-6">
              <div className="relative mx-auto w-64 h-64 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden">
                <img
                  src={avatars[avatarIndex]} // Dynamically load the avatar based on index
                  alt={`Avatar ${avatarIndex + 1}`}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
            </div>

            {/* User Info */}
            <p className="text-lg font-medium text-gray-300 mb-6">
              "Your personalized avatar is ready!"
            </p>

            {/* Actions */}
            <div className="flex space-x-4 justify-center">
              {/* Regenerate Button */}
              <button
                onClick={handleRegenerate}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
              >
                Regenerate Avatar
              </button>

              {/* Download Button */}
              <button
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = avatars[avatarIndex];
                  a.download = `Avatar_${avatarIndex + 1}.png`;
                  a.click();
                }}
              >
                Download Avatar
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
        </div>
      )}
    </div>
  );
};

export default AvatarPage;
