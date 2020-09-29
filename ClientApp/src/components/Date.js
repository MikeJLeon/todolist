import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

export class DateBox extends Component {
  static displayName = Date.name;
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      id: "",
      height:0
    };
    this.handleHeight = this.handleHeight.bind(this);
  }

  handleHeight(){
    this.setState({
        height:this.dateRef.offsetHeight
    })
  }
  componentDidMount(){
      this.setState({
          date:this.props.date,
          id:this.props.id,
          height:this.dateRef.offsetHeight
      })
  }

  render() {
    return (
      <div
        data-id={this.state.id}
        date-height={this.state.height}
        className="dateContainer"
        ref={(dateRef) => {this.dateRef = dateRef}}
      >
        <span className="dateValue">{this.state.date}</span>
      </div>
    );
  }
}
