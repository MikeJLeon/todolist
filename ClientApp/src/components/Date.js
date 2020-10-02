import React, { Component } from "react";
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
      createActive: false,
      modifyActive: false,
      height: 0,
    };
  }
  activeText = (target = "none", task = -1) => {
    if (target === "Create") {
      this.setState({
        createActive: !this.state.createActive,
        modifyActive: false,
      });
    } else if (target === "Modify") {
      this.setState({
        modifyActive: task,
        createActive: false,
      });
    } else {
      this.setState({
        modifyActive: false,
        createActive: false,
      });
    }
  };
  setupComponent = () => {
    this.setState(
      {
        date: this.props.date,
        id: this.props.id,
        tasks: this.props.tasks,
      },
      () => {
        this.setState(
          {
            active: true,
            height: parseFloat(this.dateRef.getBoundingClientRect().height),
          },
          () => this.props.setHeight(this.state.id, this.state.height)
        );
      }
    );
  };
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setupComponent();
    }
  }
  componentDidMount() {
    if (this.props.initial) {
      this.setupComponent();
    } else {
      this.setState(
        {
          date: this.props.date,
          id: this.props.id,
          tasks: this.props.tasks,
          height: this.props.height,
        },
        () => {
          setTimeout(() => {
            this.setState({
              active: true,
            });
          }, 10);
        }
      );
    }
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
        {this.state.tasks.length !== 0 ? (
          <ul className="tasks">
            {this.state.tasks.map((task, index) =>
              this.state.modifyActive === index ? (
                <ModifyTask
                  desc={task.desc}
                  task={task}
                  TaskID={task.id}
                  TaskCompleted={task.completed}
                  activeText={this.activeText}
                  setHeight={this.props.setHeight}
                  addTask={this.props.addTask}
                  getTask={this.props.getTasks}
                  handleComplete={this.props.handleComplete}
                  closeCreate={() => this.activeText("Modify")}
                />
              ) : (
                <li
                  className={
                    task.completed ? "taskDesc taskCompleted" : "taskDesc"
                  }
                  key={index}
                  onClick={() => this.activeText("Modify", index)}
                >
                  {task.desc}
                </li>
              )
            )}
          </ul>
        ) : (
          <ul className="tasks">
            <li>No tasks yet!</li>
          </ul>
        )}
        {this.state.createActive ? (
          <CreateTask
            closeCreate={() => this.activeText("Create")}
            addTask={this.props.addTask}
            date={this.state.date}
          />
        ) : (
          <div onClick={() => this.activeText("Create")} className="taskButton">
            Create
          </div>
        )}
      </div>
    );
  }
}
