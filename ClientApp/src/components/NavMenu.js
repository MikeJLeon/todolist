import React, { Component } from "react";
import { Navbar } from "reactstrap";
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
          <div className="welcomeUser">
            <span>
              Hello, {this.props.firstName} {this.props.lastName}!
            </span>
          </div>
          <div className="buttonsUser">
            <Link
              className="dashSetBTN"
              to={
                this.props.settingsActive
                  ? "/Dashboard/"
                  : "/Dashboard/Settings/"
              }
              onClick={this.props.handleSettingsClick}
            >
              {this.props.settingsActive ? "Dashboard" : "Settings"}
            </Link>
            <div className="dashSetBTN" onClick={this.props.redirect}>Logout</div>
          </div>
        </Navbar>
      </header>
    );
  }
}
