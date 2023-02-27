import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-chat-elements/dist/main.css';

//init app in react
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);