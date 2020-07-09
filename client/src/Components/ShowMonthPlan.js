import React, { Component } from 'react';
import Checkboxes from './Checkboxes';


class ShowMonthPlan extends Component {
  

  render() {
    const { name,is_done } = this.props
    return(
      <div className = 'month-plan-box'>
        <span className = 'month-plan'>{name}</span>
        {/* <Checkboxes onChange={handleChange}/> */}
        <Checkboxes />
      </div>
    )
  }
}

export default ShowMonthPlan;