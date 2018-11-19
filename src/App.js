import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "./store/store";
import CardForm from "./CardForm";
import Loading from "./Loading";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={CardForm} exact />
            <Route path="/loading" component={Loading} exact />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
