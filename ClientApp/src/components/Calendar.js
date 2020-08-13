import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
import { createCalendar } from "../utils/CalendarUtil.js"
export class Calendar extends Component {
  static displayName = Calendar.name;
  constructor(props) {
    super(props);
    this.state = {
      createTask: false,
    };
  }
  componentDidMount(){
    createCalendar();
  }

  addTask = (e) => {
    console.log("createnewtask");
    console.log(e);
    this.setState({ createTask: true });
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
          
      </div>
    );
  }
}
