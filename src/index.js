import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, navigate } from "@reach/router";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import moment from "moment";

class AppContainer extends Component {
  componentDidMount = () => {
    if (window.location.pathname === "/") {
      navigate(`/${moment().format("YYYY-MM-DD")}`);
    }
  };
  render() {
    return (
      <Router>
        <App path=":plannerDate" />
      </Router>
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById("root"));
registerServiceWorker();
