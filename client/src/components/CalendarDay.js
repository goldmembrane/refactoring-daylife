import React from 'react';
import CalendarDayList from './CalendarDayList';

const CalendarDay = (props) => {
  const today = new Date();
  const dayList = props.dayList;
  const dayListItems = dayList.map( (day, index) => 
    <CalendarDayList
      key = {index} 
      dayList = {day} />
  );

  return (
    <div>
      <span className = 'currentYear'>{today.getFullYear()}</span>
      <span className = 'currentMonth'>{today.getMonth() + 1}</span>
      <div className = 'dayList'>{dayListItems}</div>
    </div>
  )
}

export default CalendarDay;