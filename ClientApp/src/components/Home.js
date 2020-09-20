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
    };
    this.fadeOut = this.fadeOut.bind(this);
    this.waveHandSetup = this.waveHandSetup.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.state.handWaveID);
  }
  componentDidMount() {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      if (response.data) {
        this.setState({loading: true})
        let container = document.getElementsByClassName("mainContainer")[0];
        container.classList.add("fade-exit-active");
        setTimeout(() => {
          this.setState({
            redirect: true,
            destination: "/Dashboard",
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
      return <Redirect to={this.state.destination} />;
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
          <p>
            This application allows you to create tasks and to check off that
            you've done it to keep track of things you need to do.
          </p>
          <div className="buttonContainer">
            <Link to="/SignUp" className="SignUpBtn" />
            <Link to="/Login" className="SignUpBtn" />
          </div>
        </div>
      </div>
    );
  }
}
