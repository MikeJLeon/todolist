import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Calendar } from "./Calendar";
import { Loading } from "./Loading";
import "../styles/dashboard.css";
export class Dashboard extends Component {
  static displayName = Dashboard.name;
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      first_name: "",
      last_name: "",
      authenticated: false,
      redirect: false,
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ user_name: this.props });
    Axios.get("https://localhost:5001/account/authorized")
      .then((response) => {
        if (response.data) {
          this.setState({
            user_name: response.data.userName,
            first_name: response.data.firstName,
            last_name: response.data.lastName,
            authenticated: true,
          });
          this.setState({
            loading: false,
          });
          let bodyContainer = document.getElementsByClassName(
            "bodyContainerInitial"
          )[0];
          setTimeout(function () {
            bodyContainer.classList.remove("bodyContainerInitial");
          }, 500);
        }
      })
      .catch((error) => {
        this.setState({
          redirect: true,
        });
      });
  }

  logout = () => {
    Axios.get("https://localhost:5001/account/logout").then(() => {
      this.setState({ redirect: true });
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="bodyContainer bodyContainerInitial">
        <NavMenu
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          redirect={this.logout}
        />
        <div className="contentContainer">
          <Calendar />
          {/* <button onClick={this.createNewTask}>Create</button>
        {this.state.createTask ? <CreateTask /> : ""} */}
        </div>
      </div>
    );
  }
}
