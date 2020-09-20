import React, { Component } from "react";
import { Route } from "react-router";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Recover } from "./components/Recover";
import { CSSTransition } from "react-transition-group";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/SignUp", name: "SignUp", Component: SignUp },
  { path: "/Login", name: "Login", Component: Login },
  { path: "/Recover/:email/:token", name: "Recover", Component: Recover },
];

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div className="wrapper">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={2000}
                  classNames="fade"
                  unmountOnExit
                >
                  <Component />
                </CSSTransition>
              )}
            </Route>
          ))}
          <Route path="/Dashboard" component={Dashboard} />
      </div>
      /* <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Login" component={Login} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Recover/:email/:token" component={Recover} />
          </Switch> */
    );
  }
}
