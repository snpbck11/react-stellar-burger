import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app"
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./services/store";

ReactDOM.render(
    <Provider store={store}> 
      <Router>
        <App />
      </Router>
    </Provider>, document.getElementById("root")
);

reportWebVitals();