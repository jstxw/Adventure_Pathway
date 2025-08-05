import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoryLoader from "./Components/StoryLoader";
import StoryGenerator from "./Components/StoryGenerator";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Interactive Story Generator</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<StoryGenerator />} />
            <Route path="/story/:id" element={<StoryLoader />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
