import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/taskStyle.css";
export class ModifyTask extends Component {
  static displayName = ModifyTask.name;
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      desc: this.props.TaskDesc,
    };
    this.updateTask = this.updateTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  componentDidMount(){
    let buttonContainer = document.getElementsByClassName("taskButtonContainerInitial")[0];
    setTimeout(function(){
      buttonContainer.classList.remove("taskButtonContainerInitial");
    }, 5);
  }
  handleText(e) {
    this.setState({ desc: e.currentTarget.value });
  }
  updateTask(e, taskID) {
    let desc = this.state.desc;
    Axios.post(
      "https://localhost:5001/account/tasks/update/description/" + taskID,
      null,
      {
        params: {
          taskID: taskID,
          taskDesc: desc,
        },
      }
    ).then((response) => {
      this.props.handleComplete();
    });
  }

  deleteTask(taskID) {
    Axios.delete("https://localhost:5001/account/tasks/delete/" + taskID, {
      data: {
        taskID: taskID,
      },
    }).then((response) => {
      this.props.handleComplete();
    });
  }

  completeTask(taskID, completed) {
    Axios.post(
      "https://localhost:5001/account/tasks/update/completed/" + taskID,
      null,
      {
        params: {
          taskID: taskID,
          completed: !completed,
        },
      }
    ).then((response) => {
      this.props.handleComplete();
    });
  }
  render() {
    return (
      <div className="createTask">
          <textarea
            className="taskDesc"
            rows="4"
            cols="50"
            value={this.state.desc}
            maxLength="100"
            onChange={this.handleText}
          ></textarea>
          <div className="taskButtonContainer taskButtonContainerInitial">
            <button onClick={(e) => this.updateTask(e, this.props.TaskID)}>
              Update
            </button>
            <button onClick={() => this.deleteTask(this.props.TaskID)}>
              Delete
            </button>
            <button
              onClick={() =>
                this.completeTask(this.props.TaskID, this.props.TaskCompleted)
              }
            >
              Completed?
            </button>
            <button onClick={this.props.handleComplete}>Cancel</button>
          </div>
        </div>
    );
  }
}
