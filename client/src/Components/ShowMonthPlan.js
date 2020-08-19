import React, { Component } from "react";
import Checkboxes from "./Checkboxes";

class ShowMonthPlan extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="month-plan-box">
        <span className="month-plan">{name}</span>
        <Checkboxes />
      </div>
    );
  }
}

export default ShowMonthPlan;
