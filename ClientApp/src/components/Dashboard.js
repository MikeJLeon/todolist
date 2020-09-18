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
      calendarActive: false,
      calendarLoading: false,
      loaded: false,
      tasks: false,
    };
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.loadCalendar = this.loadCalendar.bind(this);
    this.authorized = this.authorized.bind(this);
  }
  componentDidMount() {
    this.authorized();
  }
  authorized = () => {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      console.log(response.data);
      if (response.data) {
        this.setState({
          email: response.data.email,
          first_name: response.data.firstName,
          last_name: response.data.lastName,
          authenticated: true,
          loaded: true,
        });
      } else {
        this.setState({
          redirect: true,
        });
      }
    });
  };
  logout = () => {
    Axios.get("https://localhost:5001/account/logout").then(() => {
      this.setState({ redirect: true });
    });
  };
  handleSettingsClick() {
    this.setState(
      {
        settingsActive: !this.state.settingsActive,
        calendarActive: false,
      },
      () => {
        if (!this.state.settingsActive) {
          this.loadCalendar();
        }
      }
    );
  }
  loadCalendar = () => {
    this.setState({
      settingsActive: false,
      calendarActive: true,
      calendarLoading: false,
    });
  };
  storeTasks = (tasks) => {
    this.setState({ tasks: tasks });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className={
          this.state.loaded &&
          (this.state.calendarActive || this.state.settingsActive)
            ? "dashboard"
            : "dashboardInitial"
        }
      >
        <NavMenu
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          redirect={this.logout}
          settingsActive={this.state.settingsActive}
          handleSettingsClick={this.handleSettingsClick}
        />
        <div className="contentContainer">
          {this.state.settingsActive ? (
            <Settings authorized={this.authorized} email={this.state.email} />
          ) : (
            <Calendar
              tasks={this.state.tasks}
              storeTasks={this.storeTasks}
              loadCalendar={this.loadCalendar}
            />
          )}
          {/* <button onClick={this.createNewTask}>Create</button>
        {this.state.createTask ? <CreateTask /> : ""} */}
        </div>
      </div>
    );
  }
}
