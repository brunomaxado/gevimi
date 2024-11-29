import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContexProvider } from "./context/authContext";
import { ModifiedProvider } from "./context/ModifiedContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModifiedProvider> 
    <AuthContexProvider>
    <App />
    </AuthContexProvider>
    </ModifiedProvider>
  </React.StrictMode>
);

reportWebVitals();
