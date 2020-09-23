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
      redirect: false,
      error: false,
      loading: false,
      recover: false,
      loginActive: false,
      firstName: "",
      lastName: "",
      email: "",
      authorized:false,
    };
    this.handleRecovery = this.handleRecovery.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
  }
  componentDidMount() {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      if (response.data) {
        this.setState(
          {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.userName,
            authorized: true,
          },
          () => {
            this.fadeOut();
          }
        );
      }
    });
  }
  fadeOut() {
    let main = document.getElementsByClassName("mainContainer")[0];
    main.classList.add("fade-exit-active");
    setTimeout(() => {
      this.setState({
        redirect: true,
      });
    }, 1000);
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleRecovery() {
    this.setState({ recover: true });
  }
  handleRecoverySubmit = (e) => {
    let email = this.state.email;
    let url = "../account/forgot/";
    e.preventDefault();
    Axios.post(url, null, {
      params: {
        email: email,
      },
    })
      .then((response) => {
        this.setState({ recover: false, error: false });
      })
      .catch((response) => {
        this.setState({ error: true });
      });
  };
  handleSubmit = (e) => {
    this.setState({
      error: false,
      loading: true,
    });
    e.preventDefault();
    let { user_name, password } = this.state;
    let url = "../account/login/";
    Axios.post(url, null, {
      params: {
        user_email: user_name,
        password: password,
      },
    })
      .then((response) => {
        if (response.data) {
          this.setState(
            {
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
            },
            () => {
              this.fadeOut();
            }
          );
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
      return (
        <Redirect
          to={{
            path: "/Dashboard",
            state: {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              authorized: this.state.authorized,
            },
          }}
        />
      );
    }
    return (
      <div className="mainContainer">
        <div className="login">
          {this.state.loading && !this.state.error ? (
            <div className="loadingContainer">
              <Loading />
            </div>
          ) : this.state.recover ? (
            <div className="requirements">
              <h2>Mike's Todolist</h2>
              <h3>Please enter an email to recover</h3>
              <form className="loginForm" onSubmit={this.handleRecoverySubmit}>
                <div>Your user name</div>
                {this.state.error && this.state.recover ? (
                  <div>User does not exist!</div>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Your email goes here"
                />
                <br />
                <input type="submit" className="submitButton" />
              </form>
            </div>
          ) : (
            <div className="requirements">
              <h2>Mike's Todolist</h2>
              <h3>Welcome back! Please login :^</h3>

              {this.state.error ? (
                <div className="error">
                  User name or password is incorrect. Try Again!
                </div>
              ) : (
                ""
              )}
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
              <div onClick={this.handleRecovery}>Forgot Password?</div>
            </div>
          )}{" "}
        </div>
      </div>
    );
  }
}
