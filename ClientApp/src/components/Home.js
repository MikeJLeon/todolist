import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/home.css";
import { Loading } from "./Loading";
import { Redirect, Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      homeActive: false,
      handWave: false,
      handWaveID: 0,
      redirect: false,
      destination: "",
      firstName: "",
      lastName: "",
      email: "",
      authorized: false,
    };
    this.fadeOut = this.fadeOut.bind(this);
    this.waveHandSetup = this.waveHandSetup.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.state.handWaveID);
  }
  componentDidMount() {
    Axios.get("planner.michaeljleon.com/account/authorized").then((response) => {
      if (response.data) {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.userName,
          authorized: true,
          loading: true,
        });
        let container = document.getElementsByClassName("mainContainer")[0];
        container.classList.add("fade-exit-active");
        setTimeout(() => {
          this.setState({
            redirect: true,
          });
        }, 500);
      } else {
        this.setState({
          loading: false,
          homeActive: true,
        });
        let handWaveID = this.waveHandSetup();
        this.setState({
          handWaveID: handWaveID,
        });
      }
    });
  }
  fadeOut() {
    this.setState({ homeActive: false });
  }
  waveHandSetup() {
    let handWaveID = setInterval(() => {
      this.setState({
        handWave: true,
      });
      setTimeout(() => {
        this.setState({ handWave: false });
      }, 250);
    }, 10000);
    return handWaveID;
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/Dashboard",
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
    if (this.state.loading) {
      return (
        <div className="mainContainer">
          <div className="home">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <div className="mainContainer">
        <div className="home">
          <div className="upperHome">
            <h1>The Planner</h1>
            <div
              className={
                this.state.handWave ? "handWave handWaveAnimate" : "handWave"
              }
            >
              <span role="img" aria-label="handwave">
                🖐️
              </span>
            </div>
          </div>
          <div className="homeDescContainer">
            <p>
              This application allows you to create tasks and to check off that
              you've done it to keep track of things you need to do.
            </p>
          </div>
          <div className="buttonContainer">
            <Link to="/SignUp" className="SignUpBtn">
              Sign Up
            </Link>
            <Link to="/Login" className="SignUpBtn">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
