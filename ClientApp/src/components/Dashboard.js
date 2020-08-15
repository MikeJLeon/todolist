import React, { Component } from "react";
import Nav, { NavMenu } from "./NavMenu";
import Axios from "axios";
import { CreateTask } from "./CreateTask";
import { Redirect } from "react-router-dom";
import { Calendar } from "./Calendar";
import { Loading } from "./Loading";
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
      createTask: false,
      loading: true,
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
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          redirect: true,
        });
        console.log("Redirecting", error);
      });
  }

  getTasks() {
    Axios.get("https://localhost:5001/account/tasks/get/").then((response) => {
      console.log(response);
      this.setState({ tasks: response.data, loading: false });
    });
  }

  logout = () => {
    Axios.get("https://localhost:5001/account/logout").then(() => {
      this.setState({ redirect: true });
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <NavMenu
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          redirect={this.logout}
        />
        <div className="contentContainer">
          <Calendar />
          {/* <button onClick={this.createNewTask}>Create</button>
        {this.state.createTask ? <CreateTask /> : ""} */}
        </div>
      </div>
    );
  }
}
