import React, { Component } from 'react';

class ShowYearPlan extends Component {
  
  render() {
    const { name } = this.props;
    return (
      <div className = 'year-plan-box'>
        <div className = 'year-plan'>{name}</div>
      </div>
    )
  }
}

export default ShowYearPlan;