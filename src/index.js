import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as ReactThreeFiber from '@react-three/fiber';

window.React = React;
window.THREE = THREE;
window.THREE.GLTFLoader = GLTFLoader;
window.ReactThreeFiber = ReactThreeFiber;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


