import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

console.log("main.jsx is loading...");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("App rendered successfully");
} else {
  console.error("Root element not found!");
}
