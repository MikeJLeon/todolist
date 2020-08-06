import React, { Component } from "react";
import Nav, { NavMenu } from "./NavMenu";
import Axios from "axios";
import { Redirect } from "react-router-dom";
export class Dashboard extends Component {
  static displayName = Dashboard.name;
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      first_name: "",
      last_name: "",
      tasks: {},
      authenticated: false,
      redirect: false,
    };
  }
  componentDidMount() {
    this.setState({ user_name: this.props });
    console.log(this.props);
    Axios.get("https://localhost:5001/account/authorized")
      .then((response) => {
        console.log(response);
        if (response.data) {
          this.setState({
            user_name: response.data.userName,
            first_name: response.data.firstName,
            last_name: response.data.lastName,
            authenticated: true,
          });
          this.getTasks();
        }
      })
      .catch((error) => {
        this.setState({
          redirect: true,
        });
        console.log("Redirecting", error);
      });
  }
  createNewTask = () => {
    console.log("createnewtask");
    Axios.post("https://localhost:5001/account/tasks/create", null, {
      params: {
        desc: "Second task",
      },
    }).then((response) => {
      this.getTasks();
    });
  };

  getTasks() {
    Axios.get("https://localhost:5001/account/tasks/get/").then((response) => {
      console.log(response);
      this.setState({ tasks: response.data });
    });
  }
  deleteTask = (id) => {
    Axios.delete("https://localhost:5001/account/tasks/delete/" + id, {
      data: {
        taskID: id,
      },
    }).then((response) => {
      console.log("Task removed");
      this.getTasks();
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Login" />;
    }
    return (
      <div>
        <NavMenu
          first_name={this.state.first_name}
          last_name={this.state.last_name}
        />
        <button onClick={this.createNewTask}></button>
        <ul>
          {Object.keys(this.state.tasks).map((key) => {
            return (
              <li>
                {this.state.tasks[key].desc}
                <button
                  onClick={() => this.deleteTask(this.state.tasks[key].id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
