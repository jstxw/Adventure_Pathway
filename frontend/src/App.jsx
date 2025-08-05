import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoryLoader from "./Components/StoryLoader";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Interactive Story Generator</h1>
        </header>
        <main>
          <Routes>
            <Route path={"/story/:id"} element={<StoryLoader />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}
