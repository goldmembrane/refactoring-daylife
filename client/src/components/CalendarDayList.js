import React from 'react';

const CalendarDayList = (props) => {
  <div className = 'dayList-item'>
    <span className = 'day-of-the-week'>{props.dayList}</span>
  </div>
}

export default CalendarDayList;