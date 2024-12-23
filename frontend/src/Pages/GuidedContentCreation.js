import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sentosa_video from "../Assets/sentosa_video.mp4";

const GuidedContentCreation = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    prompt: "",
    theme: "",
    script: "",
  });
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false); // State for video loading
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) {
      if (step === 1 && !data.prompt) {
        toast.error("Please provide a prompt.");
        return;
      }
      if (step === 2 && !data.theme) {
        toast.error("Please choose a theme.");
        return;
      }
      if (step === 3 && !data.script) {
        toast.error("Please provide or generate a script.");
        return;
      }

      // Simulate video generation for Step 3 to Step 4 transition
      if (step === 3) {
        setVideoLoading(true);
        const analysisSteps = [
          "Compiling your script...",
          "Generating visual elements...",
          "Rendering transitions...",
          "Finalizing your video...",
        ];
        let index = 0;
        const interval = setInterval(() => {
          setMessages((prev) => [...prev, analysisSteps[index]]);
          index++;
          if (index === analysisSteps.length) {
            clearInterval(interval);
            setTimeout(() => {
              setVideoLoading(false);
              setStep(4);
              setMessages([]); // Reset messages for future use
            }, 1000);
          }
        }, 1500);
        return;
      }

      setStep(step + 1);
    } else {
      console.log("Final data:", data);
      navigate("/");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generatePrompt = () => {
    const newPrompt =
      "Produce a dynamic 10-second video showcasing the vibrant experience of savoring a delectable poké bowl at Sentosa, Singapore. Begin with quick, engaging scenes highlighting iconic Singapore landmarks to set the location context. Transition to close-up shots of a beautifully presented poké bowl, emphasizing its fresh and colorful ingredients. Conclude with candid moments of individuals delighting in the meal, capturing their enjoyment.";
    setTimeout(() => {
      setData({ ...data, prompt: newPrompt });
      toast.success(
        "The AI has generated this prompt based on your recent activities and preferences."
      );
    }, 1000);
  };

  const generateScript = async () => {
    if (!data.prompt || !data.theme) {
      toast.error("Please provide both a prompt and a theme.");
      return;
    }
    setLoading(true);
    toast.info("Generating script...");
    const requestBody = {
      prompt: data.prompt,
      additionalData: `The Theme is ` + data.theme,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-videoscript",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.success) {
        setData({ ...data, script: result.data });
        toast.success("AI has generated your script!");
      } else {
        toast.error(
          result.message || "Failed to generate script. Please try again."
        );
      }
    } catch (error) {
      console.error("Error generating script:", error);
      toast.error("Failed to generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white py-20 px-6">
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          {["Prompt", "Theme", "Script", "Editing"].map((label, index) => (
            <div
              key={index}
              className={`flex items-center ${
                step === index + 1 ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              <span className="mr-2">{index + 1}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-yellow-500 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-lg backdrop-blur-lg">
          {videoLoading ? (
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Generating Your Video</h2>
              {messages.map((msg, index) => (
                <p key={index} className="text-sm">
                  {msg}
                </p>
              ))}
              <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-4 border-yellow-500 mx-auto"></div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-4">
                    Step 1: Create Your Prompt
                  </h2>
                  <textarea
                    className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-400"
                    placeholder="Enter your content prompt here..."
                    value={data.prompt}
                    onChange={(e) =>
                      setData({ ...data, prompt: e.target.value })
                    }
                  />
                  <button
                    className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={generatePrompt}
                  >
                    Use AI to Generate a Prompt
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-4">
                    Step 2: Choose Theme
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {["Minimalist", "Vibrant", "Professional", "Casual"].map(
                      (theme) => (
                        <button
                          key={theme}
                          className={`p-4 border ${
                            data.theme === theme
                              ? "border-yellow-500 bg-yellow-500/10"
                              : "border-gray-700"
                          } rounded-lg hover:border-yellow-500`}
                          onClick={() => setData({ ...data, theme })}
                        >
                          {theme}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-4">
                    Step 3: Create or Upload a Script
                  </h2>
                  <textarea
                    className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-400"
                    placeholder="Write your script or generate one using AI..."
                    value={data.script}
                    onChange={(e) =>
                      setData({ ...data, script: e.target.value })
                    }
                  />
                  <button
                    className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={generateScript}
                    disabled={loading}
                  >
                    Use AI to Generate a Script
                  </button>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-4">
                    Step 4: Finalize Your Video
                  </h2>
                  <p>
                    Add transitions, effects, and fine-tune your creation using
                    our editing tools!
                  </p>
                  {sentosa_video && (
                    <div className="flex justify-center">
                      <video width="750" height="500" controls>
                        <source src={sentosa_video} type="video/mp4" />
                      </video>
                    </div>
                  )}
                  <button
                    className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                    onClick={() =>
                      navigate("/video-editor", {
                        state: { script: data.script },
                      })
                    }
                  >
                    Launch Editing Software
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && !videoLoading && (
              <button onClick={handleBack} className="px-6 py-2 bg-gray-700">
                Back
              </button>
            )}
            {!videoLoading && (
              <button onClick={handleNext} className="px-6 py-2 bg-yellow-500">
                {step === 4 ? "Finish" : step === 3 ? "Generate Video" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedContentCreation;
