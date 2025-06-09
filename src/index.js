import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyles from './GlobalStyles/GlobalStyles.js';
import ThemeProviderR from './contexts/ThemeProvider.js';
import AuthenProvider from './contexts/AuthenProvider.js';
import ShoppingProvider from './contexts/ShoppingProvider.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <AuthenProvider>
        <ShoppingProvider>
          <ThemeProviderR>
            <App />
          </ThemeProviderR>
        </ShoppingProvider>
      </AuthenProvider>
    </GlobalStyles>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
