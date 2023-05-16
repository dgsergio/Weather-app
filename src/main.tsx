import './global.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';

const root = createRoot(document.getElementById('app') as HTMLDivElement);
root.render(<App />);
