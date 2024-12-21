import { ArrowRight, Sparkles, Zap, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
      title: 'Getting Started',
      description: 'Jumpstart your content creation journey with ease.',
      link: '/get-started',
    },
    {
      icon: <Image className="h-6 w-6 text-pink-400" />,
      title: 'Guided Content Creation',
      description: 'Let AI guide you in creating captivating social media posts.',
      link: '/guided-creation',
    },
    {
      icon: <Zap className="h-6 w-6 text-green-400" />,
      title: 'Content Transformer',
      description: 'Transform raw ideas into polished content effortlessly.',
      link: '/content-transformer',
    },
  ];

  return (
    <div className="pt-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 min-h-screen text-white">
      {/* Navbar */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-yellow-400">
            Trendz
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Unlock Your Creativity with AI
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Seamlessly create, transform, and share engaging content with our AI-powered tools. Whether you're a beginner or a pro, we've got you covered.
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
                <p className="text-gray-200">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
