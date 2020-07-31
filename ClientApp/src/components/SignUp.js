import React, { Component } from "react";
import Nav, { NavMenu } from "./NavMenu";
import Axios from "axios";
export class SignUp extends Component {
  static displayName = SignUp.name;
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      first_name: "",
      last_name: "",
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
    const { user_name, first_name, last_name, password } = this.state;
    const url = "https://localhost:5001/account/create";
    console.log(user_name, first_name, last_name, password);
    Axios.post(url, null, {params:{
      "user_name":user_name,
      "first_name":first_name,
      "last_name":last_name,
      "password":password
    }});
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
          <label>Your first name</label>
          <input
            type="text"
            id="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
            placeholder="Your first name goes here"
          />
          <br />
          <label>Your last name</label>
          <input
            type="text"
            id="last_name"
            value={this.state.last_name}
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
