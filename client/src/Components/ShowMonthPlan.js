import React, { Component } from "react";
import { connect } from "react-redux";

class ShowMonthPlan extends Component {
  render() {
    return (
      <div className="month-plan-box">
        <div className="month-plan">{this.props.month}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    month: state.setPlansReducer.month,
  };
};

export default connect(mapStateToProps)(ShowMonthPlan);
