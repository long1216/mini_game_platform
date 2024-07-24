import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const GameLoader = ({ gameData }) => {
  const [gameComponent, setGameComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        console.log('Attempting to load game:', gameData.id);
        
        const response = await fetch(gameData.scriptUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch script: ${response.statusText}`);
        }
        const scriptContent = await response.text();
        
        console.log('Fetched script content:', scriptContent);

        if (scriptContent.trim().startsWith('<')) {
          throw new Error('Received HTML instead of JavaScript. Check the scriptUrl and server response.');
        }

        // Create and execute script
        const scriptElement = document.createElement('script');
        scriptElement.text = scriptContent;
        document.body.appendChild(scriptElement);

        console.log('Script appended to document body');

        // Fetch and add the CSS if it exists
        if (gameData.cssUrl) {
          const cssResponse = await fetch(gameData.cssUrl);
          if (!cssResponse.ok) {
            throw new Error(`Failed to fetch CSS: ${cssResponse.statusText}`);
          }
          const cssContent = await cssResponse.text();
          const styleElement = document.createElement('style');
          styleElement.textContent = cssContent;
          document.head.appendChild(styleElement);

          console.log('CSS appended to document head');
        }

        // Check if the game initialization function exists
        if (typeof window.initGame !== 'function') {
          console.error('window.initGame is not a function. Current value:', window.initGame);
          throw new Error('initGame function not found. Check if the script is correct and defines this function.');
        }

        // Initialize the game, passing React and ReactThreeFiber as arguments
        console.log('Calling initGame function');
        const GameComponent = window.initGame(React, gameData.assetsUrl);
        setGameComponent(() => GameComponent);

        console.log('Game component set successfully');
      } catch (error) {
        console.error('Failed to load game:', error);
        setError(error.message);
      }
    };

    if (gameData) {
      loadGame();
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('script[data-game-script]').forEach(el => el.remove());
      document.querySelectorAll('style[data-game-style]').forEach(el => el.remove());
    };
  }, [gameData]);

  if (error) {
    return <div>Error loading game: {error}</div>;
  }

  if (!gameComponent) {
    return <div>Loading game...</div>;
  }

  return gameData.is3D ? (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {React.createElement(gameComponent)}
        <OrbitControls />
      </Canvas>
    </div>
  ) : (
    React.createElement(gameComponent)
  );
};

export default GameLoader;