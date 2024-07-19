console.log('Test game script loaded');

window.initGame = (React, assetsUrl) => {
  console.log('initGame function called with assetsUrl:', assetsUrl);
  return () => {
    console.log('Game component rendered');
    return React.createElement('div', null, `Test Game Loaded Successfully! Assets URL: ${assetsUrl}`);
  };
};

console.log('initGame function defined');