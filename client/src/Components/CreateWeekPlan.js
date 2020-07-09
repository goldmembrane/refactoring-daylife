import React, { Component } from "react";
import { connect } from "react-redux";
import { setWeekPlan } from "../actions";

class CreateWeekPlan extends Component {
  sendWeekPlans = () => {
    this.props.dispatch(setWeekPlan(this.props.plan));
  };

  render() {
    return this.props.select === "weekly" ? (
      <div>
        <button
          className="save"
          onClick={() => {
            this.sendWeekPlans();
            this.props.close();
          }}
        >
          저장
        </button>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    week: state.setPlansReducer.week,
  };
};

export default connect(mapStateToProps)(CreateWeekPlan);
