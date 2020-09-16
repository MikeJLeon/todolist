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
      email: "",
      authenticated: false,
      redirect: false,
      error: false,
      loading: false,
      recover: false,
      loginActive: false,
    };
    this.handleRecovery = this.handleRecovery.bind(this);
    this.fade = this.fade.bind(this);
  }
  componentDidMount() {
    setTimeout(this.fade, 50);
    window.addEventListener("beforeunload", this.handleWindowClose);
    window.addEventListener("popstate", this.onBackButtonEvent);
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.onBackButtonEvent);
  }
  handleWindowClose = (ev) => {
    ev.preventDefault();
    return (ev.returnValue = "Leaving this page will loose data");
  };
  onBackButtonEvent = (e) => {
    e.preventDefault();
    console.log(e);
    //setTimeout(this.fade, 500);
  };
  fade() {
    this.setState({ loginActive: !this.state.loginActive });
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
        let loginContainer = document.getElementsByClassName(
          "loginContainer"
        )[0];
        loginContainer.classList.add("loginFade");
        setTimeout(() => {
          this.setState({
            redirect: true,
          });
        }, 500);
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
      <div
        className={
          this.state.loginActive ? "loginContainer" : "loginContainerInitial"
        }
      >
        {this.state.loading && !this.state.error ? (
          <div className="login">
            <div className="loadingContainer">
              <Loading />
            </div>
          </div>
        ) : this.state.recover ? (
          <div className="login">
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
          </div>
        ) : (
          <div className="login">
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
            <div onClick={this.handleRecovery}>Forgot Password?</div>
            {this.state.authenticated ? <div>Logged in</div> : ""}
          </div>
        )}
      </div>
    );
  }
}
