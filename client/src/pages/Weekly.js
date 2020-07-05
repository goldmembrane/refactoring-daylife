import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'react-moment';


const Weekly = ({ history, date }) => {

  
  const goDaily = () => {
    history.push('/');
  }

  const goMonthly = () => {
    history.push('/Monthly');
  }

  const goYearly = () => {
    history.push('/Yearly');
  }
  return (
    <div>
      <DropdownButton id = 'select-button' title = '페이지 이동'>

        <Dropdown.Item className = 'option' as = 'button'
        onClick = {goDaily}>일</Dropdown.Item>

        <Dropdown.Item className = 'option' as = 'button'
        onClick = {goMonthly}>월</Dropdown.Item>

        <Dropdown.Item className = 'option' as = 'button'
        onClick = {goYearly}>연도</Dropdown.Item>

      </DropdownButton>
      <div className = 'user-name'>user</div>
      <div className = 'weekly-goals'>이번주 목표</div>
      <div className = 'edit'>
        <div className = 'edit-schedules'>일정 편집</div>
        <div className = 'move-today'>오늘로 이동</div>
      </div>
      <div className = 'current-plans'>
        <div className = 'current-Year-and-plans'
        onClick = {goYearly}><Moment format = 'YYYY'>{date}</Moment></div>
        <div className = 'current-Month-and-plans'
        onClick = {goMonthly}><Moment format = 'MMM'>{date}</Moment></div>
      </div>
      <button className = 'move-lastweek'>왼쪽 화살표</button>
      <div className = 'weekly-plans'>
        <div className = 'daily-plans'>일</div>
        <div className = 'daily-plans'>월</div>
        <div className = 'daily-plans'>화</div>
        <div className = 'daily-plans'>수</div>
        <div className = 'daily-plans'>목</div>
        <div className = 'daily-plans'>금</div>
        <div className = 'daily-plans'>토</div>
      </div>
      <button className = 'move-nextweek'>오른쪽 화살표</button>
    </div>
  )
}

export default Weekly;