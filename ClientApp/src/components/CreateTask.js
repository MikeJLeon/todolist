import React, { Component } from "react";
import "../styles/styles.css";
export class CreateTask extends Component {
  static displayName = CreateTask.name;
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
    };
    this.activeCreate = this.activeCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  activeCreate() {
    this.props.resetCurrent();
  }

  handleChange(e) {
    console.log(e.currentTarget.value);
    this.setState({ charCount: e.currentTarget.value.length });
  }
  render() {
    return (
      <div className="container createTask">
        {this.props.createMode === this.props.date ? (
          <div>
            <textarea
              className="taskDesc"
              rows="4"
              cols="50"
              onChange={(e) => this.handleChange(e)}
              maxLength="100"
            ></textarea>
            <button onClick={(e) => this.props.addTask(e, this.props.date)}>
              Create
            </button>
            <button onClick={this.props.handleComplete}>Cancel</button>
            <div>
              {this.state.charCount}/100
              {this.state.charCount === 100 ? (
                <span className="warningCount"> Max characters reached!</span>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
