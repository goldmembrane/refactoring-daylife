import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
      return (
    // 왼쪽에 연 일정과 월 일정을 렌더링하기
    // 오른쪽 빈 공간에 달력의 형태를 렌더링하기
    <div>
      <div className = 'plans'>
        <Yearly />
        <Monthly />
      </div>
      <div className = 'main'>
        <CalendarDay />
      </div>
    </div>
  )
}
}