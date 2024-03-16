import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./components/app/app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode >
  </Provider>, document.getElementById("root")
);

reportWebVitals();