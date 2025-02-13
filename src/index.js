import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store} >
      <Router>
        <Route component={App} />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
