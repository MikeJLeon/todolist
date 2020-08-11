import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
export class CreateTask extends Component {
  static displayName = CreateTask.name;
  render() {
    return (
      <div className="container createTask">
        <input type="textarea" className="taskDesc"></input>
      </div>
    );
  }
}
