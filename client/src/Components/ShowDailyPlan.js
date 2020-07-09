import React, { Component } from 'react';


class ShowDailyPlan extends Component {
  

  render() {
    const { name, start, end } = this.props
    return(
      <div className = 'daily-shedule-box'>
        <div className = 'daily-shedule'>
            {name}
          <div className = 'daily-shedule-start'>
            {start}
          </div>
          <div className = 'daily-shedule-end'>
            {end}
          </div>    
        </div>
        
      </div>
    )
  }
}

export default ShowDailyPlan;