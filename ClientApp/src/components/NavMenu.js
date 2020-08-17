import React, { Component } from "react";
import { Navbar } from "reactstrap";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

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
        </Navbar>
      </header>
    );
  }
}
