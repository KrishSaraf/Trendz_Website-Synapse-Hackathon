import "./App.css";
import Home from "./Pages/HomePage";
import GetStarted from "./Pages/GettingStarted";
import GuidedContentCreation from "./Pages/GuidedContentCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvatarPage from "./Pages/Avatar";
import VideoEditor from "./Pages/VideoEditor";
import Academy from "./Pages/Academy";
import Tutorials from "./Pages/Tutorials";
import Community from "./Pages/Community";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/guided-creation" element={<GuidedContentCreation />} />
        <Route path="/Avatar" element={<AvatarPage />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
