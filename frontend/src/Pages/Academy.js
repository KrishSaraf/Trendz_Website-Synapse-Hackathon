import { useNavigate } from "react-router-dom";
import course0 from "../Assets/Images/course_0.png";
import course1 from "../Assets/Images/course_1.png";
import course2 from "../Assets/Images/course_2.jpg";

const Academy = () => {
  const navigate = useNavigate();

  const courses = [
    {
      title: "The Art of Visual Storytelling",
      provider: "University of Colorado Boulder",
      duration: "2-3 months",
      rating: 4.5,
      image: course0,
    },
    {
      title: "Prompt Engineering",
      provider: "Vanderbilt University",
      duration: "1 month",
      rating: 4.8,
      image: course1,
    },
    {
      title: "Adobe Content Creator",
      provider: "Adobe",
      duration: "Professional Certificate",
      rating: 4.6,
      image: course2,
    },
  ];

  const handleCourseClick = (index) => {
    navigate(`/academy/course/${index}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
          Content Creation Academy
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Explore top-notch courses designed by industry experts to help you
          excel in content creation and storytelling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleCourseClick(index)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-yellow-300">
                {course.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">
                Provider: {course.provider}
              </p>
              <p className="text-gray-300 text-sm mb-2">
                Duration: {course.duration}
              </p>
              <p className="text-yellow-400 font-medium">⭐ {course.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academy;
