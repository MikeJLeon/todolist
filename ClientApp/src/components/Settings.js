import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
export class Settings extends Component {
  static displayName = Settings.name;
  constructor(props) {
    super(props);
    this.state = {
      currentEmail: this.props.email,
      currentFirstName: this.props.firstName,
      currentLastName: this.props.lastName,
      email: this.props.email,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      confirmPassword: "",
      confirmNewPassword: "",
      newPassword: "",
      firstNameEdit: false,
      lastNameEdit: false,
      passwordEdit: false,
    };
    this.openEdit = this.openEdit.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      console.log("component updated!");
      this.setState({
        currentEmail: this.props.email,
        currentFirstName: this.props.firstName,
        currentLastName: this.props.lastName,
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        confirmPassword: "",
        confirmNewPassword: "",
        newPassword: "",
        firstNameEdit: false,
        lastNameEdit: false,
        newEmailEdit: false,
        passwordEdit: false,
      });
    }
  }
  confirmPassword = () => {
    let url = "../../account/verifypassword";
    if (this.state.newPassword === this.state.confirmNewPassword) {
      Axios.post(url, null, {
        params: {
          password: this.state.confirmPassword,
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data) {
          this.update("newPassword");
        } else {
          console.log("wrong old password");
        }
      });
      console.log(
        this.state.confirmPassword,
        this.state.confirmNewPassword,
        this.state.newPassword
      );
    } else {
      console.log("new password confirmation failed.");
    }
  };
  openEdit = (e) => {
    if (e.target.id === "firstNameEdit") {
      this.setState({ firstNameEdit: !this.state.firstNameEdit });
    } else if (e.target.id === "lastNameEdit") {
      this.setState({ lastNameEdit: !this.state.lastNameEdit });
    } else if (e.target.id === "newEmailEdit") {
      this.setState({ newEmailEdit: !this.state.newEmailEdit });
    } else if (e.target.id === "passwordEdit") {
      this.setState({
        passwordEdit: !this.state.passwordEdit,
      });
    }
  };
  handleChange = (e) => {
    console.log(e);
    console.log(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  update = (field) => {
    let value = "";
    console.log(field);
    if (field === "firstName") {
      value = this.state.firstName;
    } else if (field === "lastName") {
      value = this.state.lastName;
    } else if (field === "newPassword") {
      value = this.state.newPassword;
    } else if (field === "newEmail") {
      value = this.state.email;
    }
    console.log(value);
    let url = "https://localhost:5001/account/update";
    Axios.post(url, null, {
      params: {
        field: field,
        value: value,
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
          <div className="userInfo">
            <dt>Email:</dt>
            <dd>
              {this.state.newEmailEdit ? (
                <div className="inputContainer">
                  <input
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <div className="settingsButtonContainer">
                    <div
                      className="settingsButton"
                      onClick={() => this.update("newEmail")}
                    >
                      Save
                    </div>
                    <div
                      className="settingsButton"
                      id="newEmailEdit"
                      onClick={this.openEdit}
                    >
                      Exit
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inputContainer">
                  <input
                    className="readOnly"
                    readOnly
                    value={this.state.currentEmail}
                  ></input>
                  <div
                    className="settingsButtonContainer"
                    id="newEmailEdit"
                    onClick={this.openEdit}
                  >
                    Edit
                  </div>
                </div>
              )}
            </dd>
          </div>
          <div className="userInfo">
            <dt>First name:</dt>
            <dd>
              {this.state.firstNameEdit ? (
                <div className="inputContainer">
                  <input
                    id="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                  <div className="settingsButtonContainer">
                    <div
                      className="settingsButton"
                      onClick={() => this.update("firstName")}
                    >
                      Save
                    </div>
                    <div
                      className="settingsButton"
                      id="firstNameEdit"
                      onClick={this.openEdit}
                    >
                      Exit
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inputContainer">
                  <input
                    className="readOnly"
                    value={this.state.currentFirstName}
                    readOnly
                  ></input>
                  <div
                    className="settingsButtonContainer"
                    id="firstNameEdit"
                    onClick={this.openEdit}
                  >
                    Edit
                  </div>
                </div>
              )}
            </dd>
          </div>
          <div className="userInfo">
            <dt>Last name:</dt>
            <dd>
              {this.state.lastNameEdit ? (
                <div className="inputContainer">
                  <input
                    id="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  ></input>
                  <div className="settingsButtonContainer">
                    <div
                      className="settingsButton"
                      onClick={() => this.update("lastName")}
                    >
                      Save
                    </div>
                    <div
                      className="settingsButton"
                      id="lastNameEdit"
                      onClick={this.openEdit}
                    >
                      Exit
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inputContainer">
                  <input
                    className="readOnly"
                    value={this.state.currentLastName}
                    readOnly
                  ></input>
                  <div
                    className="settingsButtonContainer"
                    id="lastNameEdit"
                    onClick={this.openEdit}
                  >
                    Edit
                  </div>
                </div>
              )}
            </dd>
          </div>
          <hr />
          <div className="userPassword">
            {this.state.passwordEdit ? (
              <div className="passwordContainer">
                <div className="userInfo">
                  <dt>Current Password:</dt>
                  <dd>
                    <div className="inputContainer">
                      <input
                        id="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                  </dd>
                </div>
                <div className="userInfo">
                  <dt>New Password:</dt>
                  <dd>
                    <div className="inputContainer">
                      <input
                        id="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                  </dd>
                </div>
                <div className="userInfo">
                  <dt>Confirm:</dt>
                  <dd>
                    <div className="inputContainer">
                      <input
                        id="confirmNewPassword"
                        value={this.state.confirmNewPassword}
                        onChange={this.handleChange}
                      ></input>
                      <div className="settingsButtonContainer">
                        <div
                          className="settingsButton"
                          onClick={this.confirmPassword}
                        >
                          Save
                        </div>
                        <div
                          className="settingsButton"
                          id="passwordEdit"
                          onClick={this.openEdit}
                        >
                          Exit
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>
              </div>
            ) : (
              <div
                id="passwordEdit"
                className="updatePasswordBTN"
                onClick={this.openEdit}
              >
                Update Password
              </div>
            )}
          </div>
          {/* <input
            onClick={() => this.update}
            type="submit"
            className="submitButton"
          /> */}
        </form>
      </div>
    );
  }
}
