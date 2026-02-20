import React from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import App from './App';
import { AuthProvider } from './components/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
); 