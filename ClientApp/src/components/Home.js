import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/home.css";
import { Loading } from "../components/Loading";
import { Redirect, Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
    };
  }
  componentDidMount() {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      console.log(response);
      if (response.data) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          <Loading />
        </div>
      );
    }
    if (this.state.authenticated) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className="container home">
        <h1>Mike's Todolist Application</h1>
        <p>
          This application allows you to create tasks and to check off that
          you've done it to keep track of things you need to do.
        </p>
        <div className="buttonContainer">
          <div className="SignUpBtn">
            <Link to="/SignUp">Sign Up</Link>
          </div>
          <div className="SignUpBtn">
            <Link to="/Login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}
