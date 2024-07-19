import React, { useState, useEffect } from 'react';

const GameLoader = ({ gameId }) => {
  const [gameComponent, setGameComponent] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        // Fetch game metadata from your API
        const gameData = await fetchGameMetadata(gameId);

        // Fetch and execute the game script
        const scriptContent = await fetch(gameData.scriptUrl).then(res => res.text());
        const scriptElement = document.createElement('script');
        scriptElement.text = scriptContent;
        document.body.appendChild(scriptElement);

        // Fetch and add the CSS
        const cssContent = await fetch(gameData.cssUrl).then(res => res.text());
        const styleElement = document.createElement('style');
        styleElement.textContent = cssContent;
        document.head.appendChild(styleElement);

        // The script should define a global function to initialize the game
        if (window.initGame) {
          const GameComponent = window.initGame(gameData.assetsUrl);
          setGameComponent(() => GameComponent);
        }
      } catch (error) {
        console.error('Failed to load game:', error);
      }
    };

    loadGame();

    // Cleanup function
    return () => {
      // Remove the added script and style elements when component unmounts
      document.querySelectorAll('script[data-game-script]').forEach(el => el.remove());
      document.querySelectorAll('style[data-game-style]').forEach(el => el.remove());
    };
  }, [gameId]);

  return gameComponent ? React.createElement(gameComponent) : <div>Loading game...</div>;
};

export default GameLoader;