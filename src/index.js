import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
