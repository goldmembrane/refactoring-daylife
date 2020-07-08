import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowYearPlan extends Component {
  
  render() {
    return (
      <div className = 'year-plan-box'>
        <div className = 'year-plan'>{this.props.year}</div>
      </div>
    )
  }


}

const mapStateToProps = state => {
  return {
    year: state.setPlansReducer.year
  }
}

export default connect(mapStateToProps)(ShowYearPlan);