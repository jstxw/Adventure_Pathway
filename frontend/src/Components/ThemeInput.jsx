import React from "react";
import { useEffect, useState } from "react";

function ThemeInput({ onSubmit }) {
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!theme.trim()) {
      setError("Please enter a value");
      return;
    }
    onSubmit(theme);

    return (
      <div className="theme-input-container">
        <h2> Generate Your Own Adventure</h2>
        <p>Enter a theme:</p>

        <form onSubmit={handleSubmit} className="">
          <div className="input-group">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder=""
            />
          </div>
          <button type="Submit">Submit</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  };
}

export default ThemeInput;
