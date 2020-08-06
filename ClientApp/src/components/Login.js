import React, { Component } from "react";
import Nav, { NavMenu } from "./NavMenu";
import Axios from "axios";
export class Login extends Component {
  static displayName = Login.name;
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      authenticated: false,
    };
  }

  handleChange = (e) => {
    console.log(e);
    console.log(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, password } = this.state;
    const url = "https://localhost:5001/account/login/";
    Axios.post(url, null, {
      params: {
        user_name: user_name,
        password: password,
      },
    }).then(function (response) {
      console.log(response);
    });
  };
  render() {
    return (
      <div>
        <NavMenu />
        <form onSubmit={this.handleSubmit}>
          <label>Your user name</label>
          <input
            type="text"
            id="user_name"
            value={this.state.user_name}
            onChange={this.handleChange}
            placeholder="Your user name goes here"
          />
          <br />
          <label>Password</label>
          <input
            type="text"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />
          <br />
          <input type="submit" />
        </form>
        {this.state.authenticated ? <div>Logged in</div> : ""}
      </div>
    );
  }
}
