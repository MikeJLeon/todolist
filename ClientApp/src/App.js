import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/SignUp" component={SignUp} />
      </Switch>
    );
  }
}
