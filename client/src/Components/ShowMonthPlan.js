import React, { Component } from 'react';


class ShowMonthPlan extends Component {
  

  render() {
    const { name } = this.props
    return(
      <div className = 'month-plan-box'>
        <div className = 'month-plan'>{name}</div>
      </div>
    )
  }
}

export default ShowMonthPlan;