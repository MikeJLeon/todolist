import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Loading } from "../components/Loading";
import Axios from "axios";
export class Login extends Component {
  static displayName = Login.name;
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      authenticated: false,
      redirect: false,
      error: false,
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    this.setState({
      error: false,
      loading: true,
    });
    e.preventDefault();
    let { user_name, password } = this.state;
    let url = "https://localhost:5001/account/login/";
    Axios.post(url, null, {
      params: {
        user_name: user_name,
        password: password,
      },
    })
      .then((response) => {
        {
          this.setState({
            redirect: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className="loginContainer">
        {this.state.loading && !this.state.error ? (
          <div className="login">
            <div className="loadingContainer">
              <Loading />
            </div>
          </div>
        ) : (
          <div className="login">
            <div className="requirements">
              <h2>Mike's Todolist</h2>
              <h3>Welcome back! Please login :^)</h3>
              {this.state.error ? (
                <div className="error">
                  User name or password is incorrect. Try Again!
                </div>
              ) : (
                ""
              )}
            </div>
            <form className="loginForm" onSubmit={this.handleSubmit}>
              <div>Your user name</div>
              <input
                type="text"
                id="user_name"
                name="username"
                value={this.state.user_name}
                onChange={this.handleChange}
                placeholder="Your user name goes here"
              />
              <br />
              <div>Password</div>
              <input
                type="password"
                id="password"
                name="passwordw"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="password"
              />
              <br />
              <input type="submit" className="submitButton" />
            </form>
            {this.state.authenticated ? <div>Logged in</div> : ""}
          </div>
        )}
      </div>
    );
  }
}
