import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/home.css";
import { Redirect, Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;
  constructor() {
    super();
    this.state = {
      homeActive: false,
      authenticated: false,
      handWave: false,
    };
    this.fadeOut = this.fadeOut.bind(this);
  }
  componentDidMount() {
    Axios.get("https://localhost:5001/account/authorized")
      .then((response) => {
        console.log(response);
        if (response.data) {
          this.setState({
            authenticated: true,
          });
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            homeActive: true,
          });
        }, 150);
        setInterval(() => {
          this.setState({
            handWave: true,
          });
          setTimeout(() => {
            this.setState({ handWave: false });
          }, 250);
        }, 10000);
      });
  }
  fadeOut(){
    this.setState({homeActive: false});
  }
  render() {
    if (this.state.authenticated) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div
        className={
          this.state.homeActive ? "container home" : "container homeInitial"
        }
      >
        <div className="login">
          <div className="upperHome">
            <h1>Mike's Todolist Application</h1>
            <div
              className={
                this.state.handWave ? "handWave handWaveAnimate" : "handWave"
              }
            >
              🖐️
            </div>
          </div>
          <p>
            This application allows you to create tasks and to check off that
            you've done it to keep track of things you need to do.
          </p>
          <div className="buttonContainer">
            <div className="SignUpBtn">
              <Link to="/SignUp">Sign Up</Link>
            </div>
            <div className="SignUpBtn">
              <Link to="/Login" onClick={this.fadeOut}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
