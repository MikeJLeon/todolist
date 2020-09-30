import React, { Component } from "react";
import "../styles/styles.css";
export class CreateTask extends Component {
  static displayName = CreateTask.name;
  constructor() {
    super();
    this.state = {
      charCount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e.currentTarget.value);
    this.setState({ charCount: e.currentTarget.value.length });
  }
  handleSubmit = (e, date) => {
    this.props.addTask(e, date, this.props.closeCreate);
  };
  render() {
    return (
      <div className="createTask">
        <textarea
          className="taskDesc"
          rows="4"
          cols="50"
          onChange={(e) => this.handleChange(e)}
          maxLength="100"
        ></textarea>
        <div
          className="taskButton"
          onClick={(e) => this.handleSubmit(e, this.props.date)}
        >
          Create
        </div>
        <div className="taskButton" onClick={this.props.closeCreate}>
          Cancel
        </div>
        <div className="counter">
          {this.state.charCount}/100
          {this.state.charCount === 100 ? (
            <span className="warningCount"> Max characters reached!</span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
