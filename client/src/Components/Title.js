import React from "react";
import "./Title.css";

export default class Title extends React.Component {
  render() {
    return (
      <header id="title">
        <h1 id="daylife"> DAY.LIFE</h1>
        <small id="sentence">
          John F. Kennedy - We must use time as a tool, not as a crutch
        </small>
      </header>
    );
  }
}
