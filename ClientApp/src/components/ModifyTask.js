import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/taskStyle.css";
import { WordCounter } from "./WordCounter";
export class ModifyTask extends Component {
  static displayName = ModifyTask.name;
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
      desc: this.props.desc,
    };
    this.updateTask = this.updateTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  handleChange = (e) => {
    console.log(e.currentTarget.value);
    this.setState({
      charCount: e.currentTarget.value.length,
      desc: e.currentTarget.value,
    });
  };
  componentDidMount() {
    let buttonContainer = document.getElementsByClassName(
      "taskButtonContainerInitial"
    )[0];
    setTimeout(function () {
      buttonContainer.classList.remove("taskButtonContainerInitial");
    }, 5);
  }
  updateTask(e, taskID) {
    let desc = this.state.desc;
    Axios.post(
      "./account/tasks/update/description/" + taskID,
      null,
      {
        params: {
          taskID: taskID,
          taskDesc: desc,
        },
      }
    ).then((response) => {
      this.props.handleComplete(this.props.activeText);
    });
  }

  deleteTask(taskID) {
    Axios.delete("./account/tasks/delete/" + taskID, {
      data: {
        taskID: taskID,
      },
    }).then((response) => {
      this.props.handleComplete(this.props.activeText);
    });
  }

  completeTask(taskID, completed) {
    Axios.post(
      "./account/tasks/update/completed/" + taskID,
      null,
      {
        params: {
          taskID: taskID,
          completed: !completed,
        },
      }
    ).then((response) => {
      this.props.handleComplete(this.props.activeText);
    });
  }
  render() {
    return (
      <div className="createTask">
        <textarea
          className="taskDesc"
          id="modifyTask"
          value={this.state.desc}
          maxLength="100"
          onChange={this.handleChange}
        ></textarea>
        <div className="taskButtonContainer taskButtonContainerInitial">
          <div
            className="taskButton"
            onClick={(e) => this.updateTask(e, this.props.TaskID)}
          >
            Update
          </div>
          <div
            className="taskButton"
            onClick={() => this.deleteTask(this.props.TaskID)}
          >
            Delete
          </div>
          <div
            className="taskButton"
            onClick={() =>
              this.completeTask(this.props.TaskID, this.props.TaskCompleted)
            }
          >
            Done?
          </div>
          <div className="taskButton" onClick={this.props.closeCreate}>
            Cancel
          </div>
        </div>
        <WordCounter charCount={this.state.charCount} />
      </div>
    );
  }
}
