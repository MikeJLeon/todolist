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
      loading: true,
    });
    e.preventDefault();
    const { user_name, password } = this.state;
    const url = "https://localhost:5001/account/login/";
    Axios.post(url, null, {
      params: {
        user_name: user_name,
        password: password,
      },
    }).then((response) => {
      if (!response.data) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          redirect: true,
        });
      }
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Dashboard" />;
    }
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.error ? (
            <div className="error">
              User name or password is incorrect. Try Again!
            </div>
          ) : (
            ""
          )}
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
