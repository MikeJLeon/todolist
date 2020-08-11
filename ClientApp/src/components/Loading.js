import React, { Component } from "react";
import Axios from "axios";
import "../styles/styles.css";
export class Loading extends Component {
  static displayName = Loading.name;
  render() {
    return (
        <div className="loading">
          <div className="loadingBlank">
            <div className="loadingInner">
              <div className="loadingInnerBlank">
                <div className="loadingInnerBlankSlice"></div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
