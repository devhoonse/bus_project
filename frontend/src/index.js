import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger/src';
import ReduxThunk from 'redux-thunk';

import './index.css';
import '../src/media/font/font.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux';
// import loggerMiddleware from './lib/loggerMiddleware';


const logger = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      logger,
      ReduxThunk,
    )
  ),
);


ReactDOM.render(
  //<React.StrictMode>
  //  <Provider store={store}>
  //    <BrowserRouter>
          <App />,
  //    </BrowserRouter>
  //  </Provider>
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
