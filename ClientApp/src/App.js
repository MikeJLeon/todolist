import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Login" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
      </Switch>
    );
  }
}
