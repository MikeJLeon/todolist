import React, { Component } from "react";
import Axios from "axios";
export class Home extends Component {
  static displayName = Home.name;
  render() {
    return (
      <div>
        <h1>To do list application</h1>
        <p>
          This application will use a login feature and allow user to add things
          to do
        </p>
        <p>Step 1 - Implement login feature</p>
        <div class="SignUpBtn">
          <a href="/SignUp">Sign Up</a>
        </div>
        <div class="SignUpBtn">
          <a href="/Login">Login</a>
        </div>
      </div>
    );
  }
}
