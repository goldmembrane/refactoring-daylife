import React, { Component } from "react";

class ShowDailyPlan extends Component {
  render() {
    const { name, start, end } = this.props;
    return (
      <div className="daily-schedule-box">
        <div className="daily-schedule">
          {name}
          <div className="daily-schedule-start">{start}</div>
          <div className="daily-schedule-end">{end}</div>
        </div>
      </div>
    );
  }
}

export default ShowDailyPlan;
