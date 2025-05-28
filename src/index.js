import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Mantenemos el CSS global
import App from './App'; // Importamos nuestro componente principal

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);