import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
export class CreateTask extends Component {
  static displayName = CreateTask.name;
  render() {
    return (
      <div className="container createTask">
        <textarea className="taskDesc" rows="4" cols="50"></textarea>
        <button>hello</button>
      </div>
    );
  }
}
