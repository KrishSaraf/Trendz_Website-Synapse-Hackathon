import "./App.css";
import Home from "./Pages/HomePage";
import GetStarted from "./Pages/GettingStarted";
import GuidedContentCreation from "./Pages/GuidedContentCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvatarPage from "./Pages/Avatar";
import VideoEditor from "./Pages/VideoEditor";
import ContentTransformation from "./Pages/ContentTransformation";
import AnalysisPage from "./Pages/Analysis";
import ScriptPage from "./Pages/ScriptPage";
import ResultPage from "./Pages/Result";
import FileUploadPage from "./Pages/FileUpload";
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
        <Route path="/content-transformer" element={<ContentTransformation />} />
        <Route path="/file-upload" element={<FileUploadPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
