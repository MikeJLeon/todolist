import React, { Component } from "react";
import Nav, { NavMenu } from "./NavMenu";
import Axios from "axios";
export class SignUp extends Component {
  static displayName = SignUp.name;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    };
  }

  handleChange = (e) => {
    console.log(e);
    console.log(e.target.id, e.target.value)
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, firstName, lastName, password } = this.state;
    const url = "https://localhost:5001/account/create";
    console.log(username, firstName, lastName, password);
    Axios.post(url, {
      username,
      firstName,
      lastName,
      password,
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
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Your user name goes here"
          />
          <br />
          <label>Your first name</label>
          <input
            type="text"
            id="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="Your first name goes here"
          />
          <br />
          <label>Your last name</label>
          <input
            type="text"
            id="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Your last name goes here"
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
      </div>
    );
  }
}
