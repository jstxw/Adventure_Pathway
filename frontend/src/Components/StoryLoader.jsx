import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import LoadingStatus from "./LoadingStatus";
import StoryGame from "./StoryGame";
import { API_BASE_URL } from "../util.js";

function StoryLoader() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  const loadStory = async (storyId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/stories/${storyId}/complete`
      );
      setStory(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Story not found");
      } else {
        setError("Failed to load story");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStory(id);
  }, [id]);

  const createNewStory = () => {
    navigate("/");
  };

  if (loading) {
    return <LoadingStatus theme="story" />;
  }

  if (error) {
    return (
      <div className="story-loader">
        <div className="error-message">
          <h2>Story Not Found</h2>
          <p>{error}</p>
          <button onClick={createNewStory}>Generate New Story</button>
        </div>
      </div>
    );
  }

  if (story) {
    return (
      <div className="story-loader">
        <StoryGame story={story} onNewStory={createNewStory} />{" "}
      </div>
    );
  }

  return null; // fallback for unexpected edge cases
}

export default StoryLoader;
