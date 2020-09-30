import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import "../styles/taskStyle.css";
import { DateBox } from "./Date";
import LazyLoad from "react-lazyload";
import { PlaceHolderComponent } from "./PlaceholderDate";

export class Calendar extends Component {
  static displayName = Calendar.name;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dateActive: false,
      dates: [],
      dateBoxes: [],
      calculated: {},
      currentDates: [],
      currentTask: "",
      createMode: false,
      active: false,
      tasks: [],
      currentView: 0,
      minDate: "0000-00-00",
      maxDate: "0000-00-00",
      min: 0,
      max: 12,
      bodyHeight: 0,
    };
    this.addTask = this.addTask.bind(this);
    this.dateActive = this.dateActive.bind(this);
    this.setTask = this.setTask.bind(this);
    this.resetCurrent = this.resetCurrent.bind(this);
    this.setCreateMode = this.setCreateMode.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  setHeight = (id, height) => {
    if (this.state.loading) {
      let heights = this.state.calculated;
      heights[id] = height;
      this.setState({
        calculated: heights,
        loading: false,
      });
    }

    //heights[id] = { date: heights[id], height: height };
  };
  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      console.log("Update detected!" + this.props.active + " vs " + prevProps);
      this.setState({
        active: this.props.active,
      });
    }
  }
  componentDidMount() {
    if (this.props.dates) {
      this.setState(
        {
          dates: this.props.dates,
        },
        () => {
          setTimeout(() => {
            this.setState({
              active: true,
            });
            console.log(this.state.active);
            this.props.loadCalendar();
            this.createCalendar();
            this.resetCurrent();
            this.getTasks();
          }, 50);
        }
      );
    } else {
      setTimeout(() => {
        this.setState({
          active: true,
        });
        this.getTasks();
      }, 50);
    }
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
      let date =
        currentDate.getUTCMonth() +
        1 +
        "/" +
        currentDate.getUTCDate() +
        "/" +
        currentDate.getUTCFullYear();
      if (dateArray.indexOf(date) === -1) {
        dateArray.push(date);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    let dateBoxs = dateArray.map((date) => (
      <DateBox
        key={dateArray.indexOf(date)}
        date={date}
        id={dateArray.indexOf(date)}
        tasks={this.state.tasks.filter((key) => date === key.date)}
        initial={true}
        setHeight={this.setHeight}
        addTask={this.addTask}
      />
    ));
    let minDate = dateArray[0];
    let maxDate = dateArray[dateArray.length - 1];
    minDate = minDate.split("/").reverse();
    let tmp = "0" + minDate[2];
    minDate[2] = minDate[1];
    minDate[1] = tmp;
    minDate = minDate.join("-");
    maxDate = maxDate.split("/").reverse();
    tmp = "0" + maxDate[2];
    maxDate[2] = maxDate[1];
    maxDate[1] = tmp;
    maxDate = maxDate.join("-");
    this.setState(
      {
        dates: dateArray,
        dateBoxes: dateBoxs,
        minDate: minDate,
        maxDate: maxDate,
      },
      () => {}
    );
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
  getTasks = () => {
    Axios.get("https://localhost:5001/account/tasks/get/")
      .then((response) => {
        this.setState({ tasks: response.data }, () => {
          this.props.storeTasks(this.state.tasks);
        });
        this.props.loadCalendar();
      })
      .then((response) => {
        if (!this.props.dates) {
          this.createCalendar();
          this.resetCurrent();
        }
      });
  };
  addTask(event, date, closeCreate) {
    let parent = event.currentTarget.parentElement;
    let desc = parent.getElementsByClassName("taskDesc")[0].value;
    Axios.post("https://localhost:5001/account/tasks/create", null, {
      params: {
        desc: desc,
        date: date,
      },
    }).then((response) => {
      this.getTasks();
      closeCreate();
    })
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
  handleScroll = () => {
    let date = document.getElementById("scrollTo").value;
    date = date.split("-").reverse();
    let tmp = date[0].replace(/^0+/, "");
    date[0] = date[1].replace(/^0+/, "");
    date[1] = tmp;
    date = date.join("/");
    var element = document.querySelector("[date='" + date + "']");
    var headerOffset = 70;
    var elementPosition =
      document.documentElement.scrollTop + element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <div className="holdUp">
          {this.state.dateBoxes.map((dateObj) => dateObj)}
        </div>
      );
    }
    return (
      <div
        className={
          this.state.active ? "calendarContainer" : "calendarContainerInitial"
        }
      >
        <div className="datePicker">
          <input
            type="date"
            id="scrollTo"
            name="scrollTo"
            min={this.state.minDate}
            max={this.state.maxDate}
            onChange={this.handleScroll}
          />
        </div>
        {this.state.dateBoxes.map((dateObj, index) => (
          <LazyLoad
            placeholder={
              <PlaceHolderComponent
                key={index}
                date={this.state.dates[index]}
                height={this.state.calculated[index]}
              />
            }
            height={this.state.calculated[index]}
          >
            <DateBox
              key={index}
              date={this.state.dates[index]}
              id={index}
              tasks={this.state.tasks.filter(
                (key) => this.state.dates[index] === key.date
              )}
              initial={false}
              setHeight={this.setHeight}
              addTask={this.addTask}
            />
          </LazyLoad>
        ))}
        {/* {this.state.dates.slice(this.state.min, this.state.max).map((date) => (
          <DateBox
            key={this.state.dates.indexOf(date)}
            date={date}
            id={this.state.dates.indexOf(date)}
            tasks={this.state.tasks.filter((key) => date === key.date)}
          />
        ))} */}
      </div>
    );
  }
}

{
  /* {this.state.dates.map((date) =>
          this.state.currentDates.includes(date) ? (
            <div
              data-id={this.state.dates.indexOf(date)}
              key={date}
              className="dateContainer"
            >
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
          ) : (
            ""
          )
        )} */
}
