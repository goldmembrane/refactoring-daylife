import React from "react";
import "./Title.css";

export default class Title extends React.Component {
  render() {
    return (
      <header id="main">
        <h1 id="main-title"> DAY.LIFE</h1>
        <small id="sub-title">
          John F. Kennedy - We must use time as a tool, not as a crutch
        </small>
      </header>
    );
  }
}
