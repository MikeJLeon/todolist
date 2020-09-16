import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/home.css";
import { Redirect } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      homeActive: false,
      handWave: false,
      handWaveID: 0,
      redirect: false,
      destination: "",
    };
    this.fadeOut = this.fadeOut.bind(this);
    this.link = this.link.bind(this);
    this.waveHandSetup = this.waveHandSetup.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.state.handWaveID);
  }
  componentDidMount() {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      if (response.data) {
        this.setState({
          redirect: true,
          destination: "/Dashboard",
        });
      } else {
        setTimeout(() => {
          this.setState({
            homeActive: true,
          });
        }, 500);
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
  link(destination) {
    this.props.history.push("/");
    this.setState({
      homeActive: false,
    });
    setTimeout(() => {
      this.setState({
        redirect: true,
        destination: destination,
      });
    }, 500);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.destination} />;
    }
    return (
      <div
        className={
          this.state.homeActive ? "homeContainer" : "homeContainerInitial"
        }
      >
        <div className="home">
          <div className="upperHome">
            <h1>Mike's Todolist Application</h1>
            <div
              className={
                this.state.handWave ? "handWave handWaveAnimate" : "handWave"
              }
            >
              <span role="img" aria-label="handwave">🖐️</span>
            </div>
          </div>
          <p>
            This application allows you to create tasks and to check off that
            you've done it to keep track of things you need to do.
          </p>
          <div className="buttonContainer">
            <div className="SignUpBtn">
              <button onClick={() => this.link("/SignUp")}>Sign Up</button>
            </div>
            <div className="SignUpBtn">
              <button onClick={() => this.link("/Login")}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
