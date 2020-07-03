import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class CalendarYearly extends React.Component {

  render() {
    return (
      <div>
        <Calendar view = 'year' />
      </div>
    )
  }
}

export default CalendarYearly;