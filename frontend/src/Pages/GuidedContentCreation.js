import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Image } from "lucide-react";
import { toast } from "react-toastify";

const GuidedContentCreation = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    prompt: "",
    theme: "",
    script: "",
    visuals: null,
  });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 5) {
      // Basic validation for each step
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
      setStep(step + 1);
    } else {
      // Final step: simulate video generation and navigate to result
      console.log("Final data:", data);
      navigate("/results");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generatePrompt = () => {
    const newPrompt =
      "Based on your user data and preferences, create a relaxing beach video enjoying some pokebowl";
    setData({ ...data, prompt: newPrompt });
    toast.success(
      "The AI has generated this prompt based on your preferences!"
    );
  };

  const generateScript = async () => {
    if (!data.prompt || !data.theme) {
      toast.error("Please provide both a prompt and a theme.");
      return;
    }

    // Show loading notification
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

      // Check for success and extract the script
      if (result.success) {
        setData({ ...data, script: result.data }); // Use result.data for the script
        toast.success("AI has generated your script!"); // Success notification
      } else {
        toast.error(
          result.message || "Failed to generate script. Please try again."
        ); // Error notification
      }
    } catch (error) {
      console.error("Error generating script:", error);
      toast.error("Failed to generate script. Please try again."); // Error notification
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white py-20 px-6">
      {/* Progress Bar */}
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          {["Prompt", "Theme", "Script", "Visuals", "Editing"].map(
            (label, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  step === index + 1 ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                <span className="mr-2">{index + 1}</span> <span>{label}</span>
              </div>
            )
          )}
        </div>

        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-yellow-500 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-lg backdrop-blur-lg">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-4">
                {" "}
                Step 1: Create Your Prompt{" "}
              </h2>
              <textarea
                className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-400"
                placeholder="Enter your content prompt here..."
                value={data.prompt}
                onChange={(e) => setData({ ...data, prompt: e.target.value })}
              />
              <button
                className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={generatePrompt}
              >
                {" "}
                Use AI to Generate a Prompt{" "}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-4">
                {" "}
                Step 2: Choose Theme & Settings{" "}
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
                {" "}
                Step 3: Create or Upload a Script{" "}
              </h2>
              <textarea
                className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-400"
                placeholder="Write your script or generate one using AI..."
                value={data.script}
                onChange={(e) => setData({ ...data, script: e.target.value })}
              />
              <button
                className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={generateScript}
                disabled={loading}
              >
                {" "}
                {/* Disable button while loading */} Use AI to Generate a Script{" "}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-4">
                {" "}
                Step 4: Generate Visuals{" "}
              </h2>
              <div className="flex flex-col items-center justify-center w-full h-auto border-dashed border-gray-700 border rounded-lg hover:border-yellow-500 transition-colors p-4">
                {data.visuals ? (
                  <img
                    src={data.visuals}
                    alt="Visual Preview"
                    className="h-full w-auto rounded-lg"
                  />
                ) : (
                  <>
                    <Image className="h-8 w-8 text-gray-400" />
                    <label
                      htmlFor="visual-upload"
                      className="mt-2 block text-sm text-gray-400 cursor-pointer"
                    >
                      {" "}
                      Upload Visuals{" "}
                    </label>
                    <input
                      type="file"
                      id="visual-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setData({
                          ...data,
                          visuals: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-4">
                {" "}
                Step 5: Finalize Your Video{" "}
              </h2>
              <p>
                {" "}
                Add transitions, effects, and fine-tune your creation using our
                editing tools!{" "}
              </p>
              <button
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => alert("Editing tools launched!")}
              >
                {" "}
                Launch Editing Tools{" "}
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={handleBack}
              >
                {" "}
                Back{" "}
              </button>
            )}

            <button
              className="px-6 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600"
              onClick={handleNext}
            >
              {" "}
              {step === 5 ? "Finish" : "Next"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedContentCreation;
