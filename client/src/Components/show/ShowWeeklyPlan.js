import React, { Component } from "react";

class ShowWeeklyPlan extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="week-plan-box">
        <div className="week-plan">{name}</div>
      </div>
    );
  }
}

export default ShowWeeklyPlan;
