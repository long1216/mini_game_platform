import React, { useState, useEffect } from 'react';
import GameLoader from './GameLoader';

// Import the local JSON file
import gamesData from './games.json';

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Set the games from the local JSON file
    setGames(gamesData);
  }, []);

  const loadGame = (gameId) => {
    setSelectedGame(gameId);
  };

  return (
    <div className="app">
      <h1>Mini Game Platform</h1>
      <div className="game-list">
        {games.map(game => (
          <button key={game.id} onClick={() => loadGame(game.id)}>
            {game.name}
          </button>
        ))}
      </div>
      {selectedGame && <GameLoader gameData={games.find(game => game.id === selectedGame)} />}
    </div>
  );
};

export default App;