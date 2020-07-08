import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setYearPlan } from '../actions';


class CreateYearPlan extends Component {

  sendYearPlans = () => {
    this.props.dispatch(setYearPlan(this.props.plan));
  }

  render() {
    return (
      this.props.select === 'yearly' ? (
        <div>
          <button className = 'save' onClick = {() => {this.sendYearPlans(); this.props.close()}}>저장</button>
        </div>
      ) : null
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.setPlansReducer.year
  }
}

export default connect(mapStateToProps)(CreateYearPlan);