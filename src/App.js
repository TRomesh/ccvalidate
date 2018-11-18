import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import CardForm from "./CardForm";
import Loading from "./Loading";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={CardForm} exact />
          <Route path="/loading" component={Loading} exact />
        </Switch>
      </Router>
    );
  }
}

export default App;
