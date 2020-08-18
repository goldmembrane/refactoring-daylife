import React, { Component } from "react";
import { connect } from "react-redux";
import "./Main.css";
import { DailyPlan } from "../Components";
import { withRouter } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date,
    };
  }

  goWeekly = () => {
    this.props.history.push("/Weekly");
  };

  goMonthly = () => {
    this.props.history.push("/Monthly");
  };

  goYearly = () => {
    this.props.history.push("/Yearly");
  };

  render() {
    return (
      <div>
        <DailyPlan
          goYear={this.goYearly.bind(this)}
          goMonth={this.goMonthly.bind(this)}
          goWeek={this.goWeekly.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.setThisDate.date,
  };
};

export default connect(mapStateToProps)(withRouter(Main));
