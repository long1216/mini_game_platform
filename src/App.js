import React, { useState, useEffect } from 'react';
import GameLoader from './GameLoader';

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Fetch list of available games from your API
    fetchGames().then(setGames);
  }, []);

  const loadGame = async (gameId) => {
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
      {selectedGame && <GameLoader gameId={selectedGame} />}
    </div>
  );
};

export default App;