import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./App"
import { Provider } from "react-redux";
import "./index.css";
import configStore from './store';
import "react-toastify/dist/ReactToastify.css"

const store = configStore({});

const renderApp = () => {
  ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
    document.getElementById('root')
  );

}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
