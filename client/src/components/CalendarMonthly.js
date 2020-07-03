import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CalendarMonthly extends React.Component {

  render() {
    return (
      <div>
        <Calendar />
      </div>
    )
  }
}

export default CalendarMonthly;