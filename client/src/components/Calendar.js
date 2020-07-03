import React from 'react';
import Monthly from './Monthly';
import Home from './Home';
import Weekly from './Weekly';
import Yearly from './Yearly';

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange = date => { 
    this.setState({ date })
  };

  

  render() {
    return (
      <div>
        <Monthly
          onChange = {this.onDateChange}
          value = {this.state.date}
        />
        <Home
          value = {this.state.date}
        />
        <Weekly
          value = {this.state.date}
        />
        <Yearly
          onChange = {this.onDateChange}
          value = {this.state.date}
        />
      </div>
    )
  }
};

export default CalendarView;