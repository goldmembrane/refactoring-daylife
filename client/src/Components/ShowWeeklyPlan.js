
import React, { Component } from 'react';
import Checkboxes from './Checkboxes';

class ShowWeeklyPlan extends Component {
  render() {

    const { name } = this.props;
    return(
      <div className = 'week-plan-box'>
        <div className = 'week-plan'>{name}</div>
        <Checkboxes />
      </div>
    );
  }
}


export default ShowWeeklyPlan;
