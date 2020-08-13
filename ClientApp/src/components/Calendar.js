import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import { CreateTask } from "./CreateTask";
export class Calendar extends Component {
  static displayName = Calendar.name;
  constructor(props) {
    super(props);
    this.state = {
      dateActive: false,
      dates: [],
    };
    this.addTask = this.addTask.bind(this);
    this.dateActive = this.dateActive.bind(this);
  }
  componentDidMount() {
    this.createCalendar();
  }
  createCalendar = () => {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 2);
    let currentDate = startDate;
    let dateArray = new Array();
    console.log(currentDate, endDate);
    let container = document.getElementsByClassName("calendarContainer")[0];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    while (currentDate <= endDate) {
      console.log(currentDate);
      dateArray.push(currentDate.toString());
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
    console.log(dateArray);
  }
  dateActive(e){
    console.log(e);
    if (
      document.getElementsByClassName("dateActive").length > 0 &&
      e == document.getElementsByClassName("dateActive")[0]
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

  addTask(e){
    
    this.dateActive(e.currentTarget.parentElement);
    // Axios.post("https://localhost:5001/account/tasks/create", null, {
    //   params: {
    //     desc: "Second task",
    //   },
    // }).then((response) => {
    //   this.getTasks();
    // });
  };
  render() {
    return (
      <div className="calendarContainer">
        {this.state.dates.map((date) => (
          <div className="dateContainer">
            <div className="dateOverlay" onClick={this.addTask}></div>
            <span className="dateValue">{date}</span>
            <div><ul><li></li><li></li><li></li><li></li></ul></div>
            <CreateTask/>
          </div>
        ))}
      </div>
    );
  }
}
