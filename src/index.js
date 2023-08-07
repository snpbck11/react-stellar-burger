import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app"
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services/store";

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();