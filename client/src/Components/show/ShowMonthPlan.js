import React, { Component } from "react";

class ShowMonthPlan extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="month-plan-box">
        <span className="month-plan">{name}</span>
      </div>
    );
  }
}

export default ShowMonthPlan;
