import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Getting Started with AI Tools",
      description:
        "Learn the basics of using our AI-powered tools effectively.",
      link: "/tutorials/getting-started",
    },
    {
      title: "Advanced Content Creation Tips",
      description:
        "Take your content creation to the next level with these tips.",
      link: "/tutorials/advanced-tips",
    },
    {
      title: "Video Editing Techniques",
      description: "Master the art of editing videos using our video editor.",
      link: "/tutorials/video-editing",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent text-center mb-12">
          Tutorials
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <Link
              key={index}
              to={tutorial.link}
              className="group block p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:scale-105 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-yellow-400" />
                <h2 className="ml-4 text-2xl font-bold group-hover:text-yellow-300 transition-colors">
                  {tutorial.title}
                </h2>
              </div>
              <p className="text-gray-200">{tutorial.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
