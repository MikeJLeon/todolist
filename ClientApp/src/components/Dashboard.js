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
    if (this.props.settingsActive) {
      this.setState({
        calendarActive: false,
      });
    }
    if (this.props.location.state) {
      if (this.props.location.state.authorized) {
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
    Axios.get("planner.michaeljleon.com/account/authorized").then((response) => {
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
    Axios.get("planner.michaeljleon.com/account/logout").then(() => {
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
  storeTasks = (tasks, callback=false) => {
    this.setState({ tasks: tasks }, () => {
      if (callback) {
        callback();
      }
    });
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
            <Settings
              authorized={this.authorized}
              email={this.state.email}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
            />
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
