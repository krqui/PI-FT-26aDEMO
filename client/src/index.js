import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import dotenv from 'dotenv';
import axios from 'axios';
// antes estaba la etiqueta <React.StrictMode> conteniendo a <App/>
// en el Provider se realiza la conexion con redux y los estados.
dotenv.config();
axios.defaults.baseURL=process.env.REACT_APP_API||'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
