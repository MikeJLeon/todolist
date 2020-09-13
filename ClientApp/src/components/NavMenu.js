import React, { Component } from "react";
import { Navbar } from "reactstrap";
import "./NavMenu.css";
import { Link } from "react-router-dom";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor() {
    super();
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <header>
        <Navbar>
          <span>
            Hello, {this.props.first_name} {this.props.last_name}!
          </span>
          <button onClick={this.props.redirect}>Logout</button>
          {this.props.settingsActive ? (
            <Link to="/Dashboard/" onClick={this.props.handleSettingsClick}>
              Dashboard
            </Link>
          ) : (
            <Link
              to="/Dashboard/Settings/"
              onClick={this.props.handleSettingsClick}
            >
              Settings
            </Link>
          )}
        </Navbar>
      </header>
    );
  }
}
