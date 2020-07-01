import React from 'react';
import CalendarDay from './CalendarDay';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayList: ['Sunday', 'Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday', 'Saturday'],
      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      leapYear: [31,29,31,30,31,30,31,31,30,31,30,31],
      notLeapYear: [31,28,31,30,31,30,31,31,30,31,30,31]
    }
  }
  render() {
      return (
    // 왼쪽에 연 일정과 월 일정을 렌더링하기
    // 오른쪽 빈 공간에 달력의 형태를 렌더링하기
    <div>
      <div className = 'plans'>
      </div>
      <div className = 'main'>
        <CalendarDay 
          dayList = {this.state.dayList} 
          monthList = {this.state.monthList} 
          leapYear = {this.state.leapYear} 
          notLeapYear = {this.state.notLeapYear}/>
      </div>
    </div>
  )
}
}

export default Calendar;