import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Recover } from "./components/Recover";
import { Settings } from "./components/Settings";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Login" component={Login} />
        <Route
          exact
          path="/Dashboard"
          render={(props) => <Dashboard {...props} />}
        />
        <Route
          path="/Dashboard/Settings"
          render={(props) => <Dashboard {...props} settingsActive={true} />}
        />
        <Route path="/Recover/:email/:token" component={Recover} />
      </Switch>
    );
  }
}
