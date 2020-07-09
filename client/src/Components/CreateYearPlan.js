import React, { Component } from "react";
import { connect } from "react-redux";
import { setYearPlan } from "../actions";
// import * as postGoalsActions from '../modules/PostGoals';
// import { bindActionCreators } from 'redux';

class CreateYearPlan extends Component {
  sendYearPlans = () => {
    this.props.dispatch(setYearPlan(this.props.plan));
  };

  render() {
    return this.props.select === "yearly" ? (
      <div>
        <button
          className="save"
          onClick={() => {
            this.sendYearPlans();
            this.props.close();
          }}
        >
          저장
        </button>
      </div>
    ) : null;
  }
}

export default connect()(CreateYearPlan);
