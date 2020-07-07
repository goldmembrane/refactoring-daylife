import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowWeeklyPlan extends Component {
  
  render() {
    return(
      <div className = 'week-plan-box'>
        <div className = 'week-plan'>{this.props.week}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    week: state.setPlansReducer.week
  }
}

export default connect(mapStateToProps)(ShowWeeklyPlan);