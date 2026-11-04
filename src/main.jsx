import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

