
import React, { Component } from 'react';
import Checkboxes from './Checkboxes';

class ShowYearPlan extends Component {
  render() {
    const { name } = this.props;
    return (

      <div className = 'year-plan-box'>
        <span className = 'year-plan'>{name}</span>
        <Checkboxes />
      </div>
    );
  }
}


export default ShowYearPlan;
