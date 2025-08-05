//display the node the user is currently on

import { useState, useEffect, use } from "react";

function StoryGame({ story, onNewStory }) {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(False);
  const [isWinningEnding, setIsWinningEnding] = useState(false);

  //check if the story is changing, and then when the story is loaded, it extracts the root node if and sets it to the current node if

  useEffect(() => {
    if (story && story.root_node) {
      const rootNodeId = story.root_node.id;
      setCurrentNodeId(rootNodeId);
    }
  }, [story]); //dep array, anytime story changes, the root node id changes

  useEffect(() => {
    if (currentNodeId && story && story.all_nodes) {
      const node = story.all_node(currentNodeId);

      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_winning_ending);

      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
    }
  }, [currentNodeId, story]); // render new options, is currentnodeid changes

  const chooseOption = (optionId) => {
    //reset the useEffect and redo the options
    setCurrentNodeId(optionId);
  };

  const restartStory = () => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id);
    }
  };

  return;
}

export default StoryGame;
