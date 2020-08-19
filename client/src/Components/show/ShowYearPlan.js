import React, { Component } from "react";

class ShowYearPlan extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="year-plan-box">
        <span className="year-plan">{name}</span>
      </div>
    );
  }
}

export default ShowYearPlan;
