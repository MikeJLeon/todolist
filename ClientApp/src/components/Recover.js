import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Loading } from "../components/Loading";
import Axios from "axios";
export class Recover extends Component {
  static displayName = Recover.name;
  constructor() {
    super();
    this.state = {
      email: "",
      newPassword: "",
      authenticated: false,
      redirect: false,
      error: false,
      loading: false,
      count: -1,
    };
  }
  componentDidMount() {
    this.setState({
      email: this.props.match.params.email,
      token: decodeURIComponent(this.props.match.params.token),
    });
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
    let { email, token, newPassword } = this.state;
    let url = "planner.michaeljleon.com/account/recover";
    Axios.post(url, null, {
      params: {
        email: email,
        password: newPassword,
        token: token,
      },
    })
      .then((response) => {
        this.setState({
          count: 5,
        });
        setInterval(() => {
          this.setState({ count: this.state.count - 1 });
        }, 1000);
        setTimeout(() => {
          this.setState({
            redirect: true,
          });
        }, 6000);
      })
      .catch((error) => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Login/" />;
    }
    return (
      <div className="loginContainer">
        {this.state.loading ? (
          <div className="login">
            {this.state.count >= 0 ? (
              <div>Success! Redirecting in {this.state.count}...</div>
            ) : (
              ""
            )}
            <Loading />
          </div>
        ) : (
          <div className="login">
            <div className="requirements">
              <h2>Mike's Todolist</h2>
              <h3>Changing password for {this.state.email}.</h3>
            </div>
            <form className="loginForm" onSubmit={this.handleSubmit}>
              {this.state.error ? <div>Password is invalid!</div> : ""}
              <div>New password</div>
              <input
                type="text"
                id="newPassword"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
                placeholder="Your new password goes here"
              />
              <br />
              <input type="submit" className="submitButton" />
            </form>
          </div>
        )}
      </div>
    );
  }
}
