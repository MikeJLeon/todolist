import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Calendar } from "./Calendar";
import { Settings } from "./Settings/Settings";
import "../styles/dashboard.css";
export class Dashboard extends Component {
  static displayName = Dashboard.name;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      authenticated: false,
      redirect: false,
      settingsActive: false,
    };
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }
  componentDidMount() {
    this.setState({ user_name: this.props });
    Axios.get("https://localhost:5001/account/authorized")
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          this.setState({
            email: response.data.email,
            first_name: response.data.firstName,
            last_name: response.data.lastName,
            authenticated: true,
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
  handleSettingsClick() {
    this.setState({
      settingsActive: !this.state.settingsActive,
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="bodyContainer bodyContainerInitial">
        <NavMenu
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          redirect={this.logout}
          settingsActive={this.state.settingsActive}
          handleSettingsClick={this.handleSettingsClick}
        />
        <div className="contentContainer">
          {this.state.settingsActive ? (
            <Settings email={this.state.email} />
          ) : (
            <Calendar />
          )}
          {/* <button onClick={this.createNewTask}>Create</button>
        {this.state.createTask ? <CreateTask /> : ""} */}
        </div>
      </div>
    );
  }
}
