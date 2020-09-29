import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { CreateTask } from "./CreateTask";
import { ModifyTask } from "./ModifyTask";
import "../styles/taskStyle.css";

export class DateBox extends Component {
  static displayName = Date.name;
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      id: "",
      tasks: [],
      height: 0,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        height: parseFloat(this.dateRef.getBoundingClientRect().height),
        tasks: this.props.tasks,
      });
    }
  }
  componentDidMount() {
    this.setState({
      date: this.props.date,
      id: this.props.id,
      height: parseFloat(this.dateRef.getBoundingClientRect().height),
      tasks: this.props.tasks,
    });
  }

  render() {
    return (
      <div
        data-id={this.state.id}
        date-height={this.state.height}
        className="dateContainer"
        ref={(dateRef) => {
          this.dateRef = dateRef;
        }}
      >
        <span className="dateValue">{this.state.date}</span>
        <ul className="tasks">
          {this.state.tasks.map((task, index) => (
            <li key={index}>{task.desc}</li>
          ))}
        </ul>
      </div>
    );
  }
}
