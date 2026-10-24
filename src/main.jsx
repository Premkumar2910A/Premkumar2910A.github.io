import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import * as sections from './components/sections/index.client.js';
import './fonts.css';
import 'lenis/dist/lenis.css';
import './styles.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App sections={sections}/>
  </React.StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
