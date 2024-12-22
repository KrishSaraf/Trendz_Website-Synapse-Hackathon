import { Link } from "react-router-dom";
import { Users, MessageCircle } from "lucide-react";

const Community = () => {
  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-yellow-400" />,
      title: "Forums",
      description: "Join discussions and exchange ideas with other creators.",
      link: "/community/forums",
    },
    {
      icon: <Users className="h-6 w-6 text-pink-400" />,
      title: "Groups",
      description: "Collaborate with like-minded individuals in groups.",
      link: "/community/groups",
    },
    {
      icon: <Users className="h-6 w-6 text-green-400" />,
      title: "Events",
      description: "Participate in community events and grow your skills.",
      link: "/community/events",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent text-center mb-12">
          Community
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group block p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:scale-105 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h2 className="ml-4 text-2xl font-bold group-hover:text-yellow-300 transition-colors">
                  {feature.title}
                </h2>
              </div>
              <p className="text-gray-200">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
