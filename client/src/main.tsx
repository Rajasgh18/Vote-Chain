import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
