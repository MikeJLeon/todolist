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
      active: false,
      date: "",
      id: "",
      tasks: [],
      height: 0,
    };
  }
  componentDidMount() {
    this.setState(
      {
        date: this.props.date,
        id: this.props.id,
        tasks: this.props.tasks,
      },
      () => {
        setTimeout(() => {
          this.setState({
            active: true,
          });
        }, 10);
        this.setState(
          {
            height: parseFloat(this.dateRef.getBoundingClientRect().height),
          },
          () => this.props.setHeight(this.state.id, this.state.height)
        );
      }
    );
  }

  render() {
    return (
      <div
        data-id={this.state.id}
        date-height={this.state.height}
        date={this.state.date}
        className={this.state.active ? "dateContainer" : "dateContainerInitial"}
        ref={(dateRef) => {
          this.dateRef = dateRef;
        }}
      >
        <div className="dateValue">{this.state.date}</div>
        <ul className="tasks">
          {this.state.tasks.map((task, index) => (
            <li key={index}>{task.desc}</li>
          ))}
        </ul>
      </div>
    );
  }
}
