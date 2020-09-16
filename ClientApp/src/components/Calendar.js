import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/taskStyle.css";
import { CreateTask } from "./CreateTask";
import { ModifyTask } from "./ModifyTask";
export class Calendar extends Component {
  static displayName = Calendar.name;
  constructor() {
    super();
    this.state = {
      dateActive: false,
      dates: [],
      currentTask: "",
      createMode: false,
    };
    this.addTask = this.addTask.bind(this);
    this.dateActive = this.dateActive.bind(this);
    this.setTask = this.setTask.bind(this);
    this.resetCurrent = this.resetCurrent.bind(this);
    this.setCreateMode = this.setCreateMode.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  componentDidMount() {
    this.getTasks();
  }
  createCalendar = () => {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 2);
    let currentDate = startDate;
    let dateArray = [];
    // let months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    while (currentDate <= endDate) {
      dateArray.push(
        currentDate.getUTCMonth() +
          1 +
          "/" +
          currentDate.getUTCDate() +
          "/" +
          currentDate.getUTCFullYear()
      );
      currentDate.setDate(currentDate.getDate() + 1);
      // let newDiv = document.createElement("div");
      // newDiv.classList.add("CalendarDate");
      // let newP = document.createElement("div");
      // newP.classList.add("date");
      // newP.innerText =
      //   currentDate.getFullYear() +
      //   " " +
      //   currentDate.getDate() +
      //   " " +
      //   months[currentDate.getMonth()];
      // newDiv.append(newP);
      // newDiv.push(<CreateTask/>);
      // container.appendChild(newDiv);
      //newDiv.addEventListener("click", () => this.dateActive(newDiv));
    }
    this.setState({ dates: dateArray });
  };
  dateActive(e) {
    e = e.currentTarget.parentElement;
    if (
      document.getElementsByClassName("dateActive").length > 0 &&
      e === document.getElementsByClassName("dateActive")[0]
    ) {
      e.classList.remove("dateActive");
    } else if (document.getElementsByClassName("dateActive").length > 0) {
      document
        .getElementsByClassName("dateActive")[0]
        .classList.remove("dateActive");
      e.classList.add("dateActive");
    } else {
      e.classList.add("dateActive");
    }
  }
  getTasks() {
    Axios.get("https://localhost:5001/account/tasks/get/")
      .then((response) => {
        this.setState({ tasks: response.data, loading: false });
      })
      .then((response) => {
        this.createCalendar();
        this.resetCurrent();
      });
  }
  addTask(event, date) {
    let parent = event.currentTarget.parentElement;
    let desc = parent.getElementsByClassName("taskDesc")[0].value;
    Axios.post("https://localhost:5001/account/tasks/create", null, {
      params: {
        desc: desc,
        date: date,
      },
    }).then((response) => {
      this.getTasks();
    });
  }

  setTask(id) {
    this.setState({ createMode: false });
    if (id === this.state.currentTask) {
      this.setState({
        currentTask: "",
      });
    } else {
      this.setState({
        currentTask: id,
      });
    }
  }
  handleComplete() {
    this.setTask(this.state.currentTask);
    this.getTasks();
  }
  resetCurrent() {
    this.setState({
      currentTask: "",
      createMode: "",
    });
  }
  setCreateMode(date) {
    this.setState({ currentTask: "" });
    if (this.state.createMode === date) {
      this.setState({ createMode: "" });
    } else {
      this.setState({ createMode: date });
    }
  }
  render() {
    return (
      <div className="calendarContainer">
        {this.state.dates.map((date) => (
          <div key={date} className="dateContainer">
            <span className="dateValue">{date}</span>
            <hr />
            <ul className="tasks">
              {this.state.tasks.some((task) => task.date === date) ? (
                this.state.tasks.map((key) =>
                  key.date === date ? (
                    <li key={key.id}>
                      {key.id !== this.state.currentTask ? (
                        <div
                          className={
                            key.completed
                              ? "taskContainer taskComplete"
                              : "taskContainer"
                          }
                          onClick={() => this.setTask(key.id)}
                        >
                          <div className="task">{key.desc}</div>
                          {key.completed ? (
                            <span>Task completed. :^)</span>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        <div className="taskContainer">
                          <ModifyTask
                            currentTask={this.state.currentTask}
                            handleComplete={this.handleComplete}
                            setTask={this.setTask}
                            active={false}
                            addTask={this.addTask}
                            deleteTask={this.deleteTask}
                            TaskID={key.id}
                            TaskCompleted={key.completed}
                            TaskDesc={key.desc}
                            date={date}
                          />
                        </div>
                      )}
                    </li>
                  ) : (
                    ""
                  )
                )
              ) : (
                <li>No tasks yet</li>
              )}
            </ul>
            {this.state.createMode !== date ? (
              <span
                className="newTask"
                onClick={() => this.setCreateMode(date)}
              >
                + Add new task
              </span>
            ) : (
              <div>
                <span
                  className="newTask"
                  onClick={() => this.setCreateMode(date)}
                >
                  - Add new task
                </span>
                <CreateTask
                  createMode={this.state.createMode}
                  handleComplete={this.handleComplete}
                  resetCurrent={this.resetCurrent}
                  addTask={this.addTask}
                  date={date}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
