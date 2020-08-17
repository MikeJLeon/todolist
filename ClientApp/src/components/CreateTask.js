import React, { Component } from "react";
import "../styles/styles.css";
export class CreateTask extends Component {
  static displayName = CreateTask.name;
  constructor(props) {
    super(props);
    this.activeCreate = this.activeCreate.bind(this);
  }

  activeCreate() {
    this.props.resetCurrent();
  }

  render() {
    return (
      <div className="container createTask">
        {this.props.createMode === this.props.date ? (
          <div>
            <textarea className="taskDesc" rows="4" cols="50"></textarea>
            <button onClick={(e) => this.props.addTask(e, this.props.date)}>
              Create
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
