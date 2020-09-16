import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Calendar } from "./Calendar";
import { Settings } from "./Settings";
import "../styles/dashboard.css";
export class Dashboard extends Component {
  static displayName = Dashboard.name;
  constructor() {
    super();
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
        }else{
          this.setState({
            redirect: true,
          });
        }
      })
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
      <div className="dashboard">
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
