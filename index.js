import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppProviders from './AppProviders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>
);
