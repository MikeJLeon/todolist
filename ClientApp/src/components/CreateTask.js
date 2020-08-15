import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
export class CreateTask extends Component {
  static displayName = CreateTask.name;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container createTask">
        <textarea className="taskDesc" rows="4" cols="50"></textarea>
        <button onClick={(e) => this.props.addTask(e, this.props.date)}>Create</button>
      </div>
    );
  }
}
