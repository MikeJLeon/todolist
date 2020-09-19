import React, { Component } from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import store from "../redux/Store";
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor() {
    super();
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  componentDidMount(){
    console.log(store.getState());
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
              Hello, {""} {""}!
            </span>
          </div>
          <div className="buttonsUser">
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
            <Link to="" onClick={this.props.redirect}>Logout</Link>
          </div>
        </Navbar>
      </header>
    );
  }
}
