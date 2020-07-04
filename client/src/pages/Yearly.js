import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Yearly = ({ history }) => {
  
  const goDaily = () => {
    history.push('/');
  }

  const goWeekly = () => {
    history.push('/Weekly');
  }

  const goMonthly = () => {
    history.push('/Monthly');
  }

 
  
  return (
    <div>

        <DropdownButton id = 'select-button' title = '페이지 이동'>
  
          
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {goDaily}>일</Dropdown.Item>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {goWeekly}>주</Dropdown.Item>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {goMonthly}>월</Dropdown.Item>
  
        </DropdownButton>
      <div className = 'user-name'>user</div>
      <div className = 'edit'>
        <div className = 'edit-schedules'>일정 편집</div>
        <div className = 'move-today'>오늘로 이동</div>
      </div>
      <div className = 'current-plans'>
        <div className = 'current-Year-and-plans-on-Yearly'>2020</div>
      </div>
        <div className = 'calendar-box-Yearly'>
          <Calendar 
            view = 'year'
          />
        </div>
    </div>
  )
  
}

export default Yearly;