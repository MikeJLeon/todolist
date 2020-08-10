import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import Axios from "axios";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      loading:true,
      authenticated: false,
    };
  }
  componentDidMount() {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      console.log(response);
      if (response.data) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      }
    }).catch((error) =>{
      this.setState({
        loading:false,
      })
    });
  }
  render() {
    if(this.state.loading){
      return(
        <div class="Loading">
          Loading...
        </div>
      )
    }
    return (
      <Switch>
        <Route exact path="/">
          {this.state.authenticated ? <Redirect to="/Dashboard" /> : <Home />}
        </Route>
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Login" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
      </Switch>
    );
  }
}
