import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMonthPlan } from '../actions';

class CreateMonthPlan extends Component {
  
  sendMonthPlans = () => {
    this.props.dispatch(setMonthPlan(this.props.plan))
  }

  render() {
    return (
      this.props.select === 'monthly' ? (
        <div>
          <button className = 'save' onClick = {() => {this.sendMonthPlans(); this.props.close()}}>저장</button>
        </div>
      ): null
    )
  }
}

const mapStateToProps = state => {
  return {
    month: state.setPlansReducer.month
  }
}

export default connect(mapStateToProps)(CreateMonthPlan);