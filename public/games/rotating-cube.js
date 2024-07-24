window.initGame = (React, assetsUrl) => {
  const { useRef } = React;
  const { useFrame } = window.ReactThreeFiber;

  function RotatingCube() {
    const meshRef = useRef();
    useFrame((state, delta) => {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    });

    return React.createElement(
      'mesh',
      { ref: meshRef },
      React.createElement('boxGeometry', { args: [1, 1, 1] }),
      React.createElement('meshStandardMaterial', { color: "orange" })
    );
  }

  return RotatingCube;
};

console.log('Rotating Cube game script loaded');