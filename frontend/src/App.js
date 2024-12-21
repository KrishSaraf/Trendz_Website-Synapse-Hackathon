import "./App.css";
import Home from "./Pages/HomePage";
import GetStarted from "./Pages/GettingStarted";
import GuidedContentCreation from "./Pages/GuidedContentCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvatarPage from "./Pages/Avatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/guided-creation" element={<GuidedContentCreation />} />
        <Route path="/Avatar" element={<AvatarPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
