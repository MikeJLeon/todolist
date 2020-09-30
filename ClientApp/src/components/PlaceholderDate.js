import React, { Component } from "react";
export class PlaceHolderComponent extends Component {
  static displayName = PlaceHolderComponent.name;
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      height: 0,
      key:""
    };
  }
 componentDidMount(){
     this.setState({
         date:this.props.date,
         height:this.props.height,
         key:this.props.key
     })
 }
  render() {
    return <div key={this.state.key} className="dateContainer" style={{height:this.state.height+"px"}}date={this.state.date}></div>;
  }
}
