import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Calendar } from "./Calendar";
import { Settings } from "./Settings";
import "../styles/dashboard.css";

export class Dashboard extends Component {
  static displayName = Dashboard.name;
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      redirect: false,
      firstName: "",
      lastName: "",
      email: "",
      settingsActive: this.props.settingsActive,
      calendarActive: true,
      calendarLoading: false,
      loaded: false,
      tasks: false,
      dates: false,
    };
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.loadCalendar = this.loadCalendar.bind(this);
    this.authorized = this.authorized.bind(this);
    this.storeDates = this.storeDates.bind(this);
  }
  componentDidMount() {
    console.log(this.props.location);
    if (this.props.settingsActive) {
      this.setState({
        calendarActive: false,
      });
    }
    console.log("woo");
    if (this.props.location.state) {
      if (this.props.location.state.authorized) {
        console.log("valid :D");
        this.setState({
          firstName: this.props.location.state.firstName,
          lastName: this.props.location.state.lastName,
          authorized: this.props.location.state.authorized,
          email: this.props.location.state.email,
          loaded: true,
        });
      }
    } else {
      console.log("not valid :(");
      this.authorized();
    }
  }
  authorized = () => {
    Axios.get("https://localhost:5001/account/authorized").then((response) => {
      if (response.data) {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.userName,
          authorized: true,
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
  handleSettingsClick = () => {
    this.setState(
      {
        calendarActive: !this.state.calendarActive,
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              settingsActive: !this.state.settingsActive,
            },
            () => {
              if (!this.state.settingsActive) {
                if (!this.state.tasks) {
                  this.loadCalendar();
                }
              }
            }
          );
        }, 50);
      }
    );
  };
  loadCalendar = () => {
    this.setState({
      calendarLoading: false,
    });
  };
  storeTasks = (tasks) => {
    this.setState({ tasks: tasks });
  };

  storeDates = (dates) => {
    this.setState({ dates: dates });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Login" />;
    }
    return (
      <div className={this.state.loaded ? "dashboard" : "dashboardInitial"}>
        <NavMenu
          redirect={this.logout}
          settingsActive={this.state.settingsActive}
          handleSettingsClick={this.handleSettingsClick}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
        />
        {this.state.settingsActive ? (
          <div className="settingsContainer">
            <Settings
              authorized={this.authorized}
              email={this.state.email}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
            />
          </div>
        ) : (
          <div className="contentContainer">
            <Calendar
              active={this.state.calendarActive}
              tasks={this.state.tasks}
              dates={this.state.dates}
              storeTasks={this.storeTasks}
              storeDates={this.storeDates}
              loadCalendar={this.loadCalendar}
            />
          </div>
        )}
      </div>
    );
  }
}
