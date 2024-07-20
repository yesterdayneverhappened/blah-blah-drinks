import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Bar from './MakeDrink/Bar';
import MainList from './ListDrink/MainList';
import './fonts/PixeloidMono-d94EV.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <MainList/>
    <Bar/>
  </StrictMode>
);

reportWebVitals();
