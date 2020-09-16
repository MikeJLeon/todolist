import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
export class SignUp extends Component {
  static displayName = SignUp.name;
  constructor() {
    super();
    this.state = {
      user_name: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    console.log(e);
    console.log(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { user_name, email, first_name, last_name, password } = this.state;
    let url = "https://localhost:5001/account/create";
    console.log(user_name, first_name, last_name, password);
    Axios.post(url, null, {
      params: {
        user_name: user_name,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
      },
    }).then((response) => {
      url = "https://localhost:5001/account/login/";
      Axios.post(url, null, {
        params: {
          user_name: user_name,
          password: password,
        },
      }).then((response) => {
        this.setState({
          redirect: true,
        });
      });
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className="signUpContainer">
        <div className="signUp">
          <div className="requirements">
            <h2>Mike's Todolist</h2>
            <ul>
              <li>Username can only contain letters and numbers.</li>
              <span>Password must include the following:</span>
              <li>At least one digit.</li>
              <li>At least one lowercase letter.</li>
              <li>At least one uppercase letter.</li>
              <li>At least one alphanumeric character (!, @, #, Etc.)</li>
              <li>At least 6 characters long.</li>
            </ul>
          </div>
          <form className="signUpForm" onSubmit={this.handleSubmit}>
            <br />
            <div>Email</div>
            <input
              type="text"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Your email goes here"
            />
            <br />
            <div>First Name</div>
            <input
              type="text"
              id="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
              placeholder="Your first name goes here"
            />
            <br />
            <div>Last Name</div>
            <input
              type="text"
              id="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
              placeholder="Your last name goes here"
            />
            <br />
            <div>Password</div>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter your password"
            />
            <br />
            <input type="submit" className="submitButton" />
          </form>
        </div>
      </div>
    );
  }
}
