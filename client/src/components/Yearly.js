import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Yearly = (props) => {
  const today = new Date();
  return (
    <div>
      <DropdownButton id = 'dropdown-basic-button' title = '페이지 이동 : 연도'>
          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => props.history.push('/')}>3일</Dropdown.Item>
          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => props.history.push('/Weekly')}>주</Dropdown.Item>
          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => props.history.push('/Monthly')}>월</Dropdown.Item>
      </DropdownButton>
      <BrowserRouter>
        <div>
          <div className = 'current-year'>{today.getFullYear()}</div>
        </div>
        <Calendar 
          onClickMonth = {() => props.onChange(props.value)} 
          view = 'year'/>
      </BrowserRouter>
    </div>
  )
}

export default Yearly;