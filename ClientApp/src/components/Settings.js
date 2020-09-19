import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
export class Settings extends Component {
  static displayName = Settings.name;
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      firstName: "",
      lastName: "",
      newPassword: "",
      newEmail: "",
      firstNameEdit: false,
      lastNameEdit: false,
      passwordEdit: false,
    };
    this.openEdit = this.openEdit.bind(this);
  }
  componentDidMount(){
    
  }
  openEdit = (e) =>{
    console.log(e.target.id + "Edit");
    this.setState({[e.target.id + "Edit"] : !e.target.id + "Edit"})
  }
  handleChange = (e) => {
    console.log(e);
    console.log(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  update = (e) => {
    e.preventDefault();
    let { email, firstName, lastName, newPassword } = this.state;
    console.log(firstName, lastName, newPassword);
    let url = "https://localhost:5001/account/update";
    Axios.post(url, null, {
      params: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        newPassword: newPassword,
      },
    }).then(() => {
      this.props.authorized();
    });
  };

  render() {
    return (
      <div className="settings">
        <h1>Settings</h1>
        <form>
          <div>
            Email:
            <span>{this.state.email}</span>
          </div>
          <div>
            First name:
            {this.state.firstNameEdit ? (
              <input
                id="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              ></input>
            ) : (
              <div className="inputContainer">
              <div className="readOnly">{this.state.firstName}</div>
              <div className="settingsButton" id="firstName" onClick={this.openEdit}>Edit</div></div>
            )}
          </div>
          <div>
            Last name:
            <input
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            New Password:
            <input
              id="newPassword"
              value={this.state.newPassword}
              onChange={this.handleChange}
            ></input>
          </div>
          <input onClick={() => this.update} type="submit" className="submitButton" />
        </form>
      </div>
    );
  }
}
