import React, { Component } from "react";

export class WordCounter extends Component {
  static displayName = WordCounter.name;
  constructor(props) {
    super(props);
    this.state = {
      charCount: this.props.charCount,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        charCount: this.props.charCount,
      });
    }
  }
  render() {
    return (
      <div className="counter">
        {this.state.charCount}/100
        {this.state.charCount === 100 ? (
          <span className="warningCount"> Max characters reached!</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}
