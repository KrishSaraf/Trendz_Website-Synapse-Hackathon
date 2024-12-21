import "./App.css";
import Home from "./Pages/HomePage";
import GetStarted from "./Pages/GettingStarted";
import GuidedContentCreation from "./Pages/GuidedContentCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/guided-creation" element={<GuidedContentCreation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
