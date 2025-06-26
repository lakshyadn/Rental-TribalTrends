import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Correct import
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
