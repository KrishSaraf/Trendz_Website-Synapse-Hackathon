import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Image,
  Scissors,
  ChevronDown,
  BookOpen,
  Users,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsDropdownOpen(false), 5000); // Add a slight delay to avoid premature closing
  };

  const features = [
    {
      icon: <Image className="h-6 w-6 text-pink-400" />,
      title: "Guided Content Creation",
      description:
        "Let AI guide you in creating captivating social media posts.",
      link: "/guided-creation",
    },
    {
      icon: <Zap className="h-6 w-6 text-green-400" />,
      title: "Content Transformer",
      description: "Transform raw ideas into polished content effortlessly.",
      link: "/content-transformer",
    },
    {
      icon: <Scissors className="h-6 w-6 text-green-400" />,
      title: "Video Editor",
      description: "Edit and enhance your videos with the snap of a finger.",
      link: "/video-editor",
    },
  ];

  const dropdownItems = [
    {
      label: "Academy",
      icon: <BookOpen className="h-5 w-5" />,
      link: "/academy",
    },
    {
      label: "Tutorials",
      icon: <Video className="h-5 w-5" />,
      link: "/tutorials",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 min-h-screen text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-5xl font-extrabold text-yellow-400">Trendz</h1>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Home
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-white hover:text-yellow-400 transition-colors">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg text-white z-10">
                  {dropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Unlock Your Creativity with AI
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Seamlessly create, transform, and share engaging content with our
            AI-powered tools. Whether you're a beginner or a pro, we've got you
            covered.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-full transition-transform transform hover:scale-105 shadow-lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-purple-900/80 py-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-6 rounded-xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="w-16 h-16 bg-purple-800 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-200">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
