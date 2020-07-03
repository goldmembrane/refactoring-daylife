import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Monthly.css';
import CalendarView from './Calendar';

const Monthly = (props) => {
  const today = new Date();
  return (
    <div>
      <DropdownButton id = 'dropdown-basic-button' title = '페이지 이동 : 월'>
          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => props.history.push('/')}>3일</Dropdown.Item>
          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => props.history.push('/Weekly')}>주</Dropdown.Item>
          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => props.history.push('/Yearly')}>연도</Dropdown.Item>
        </DropdownButton>
      <BrowserRouter>
        <button className = 'go-to-Yearly' onClick = {() => props.history.push('/Yearly')}>{today.getFullYear()}</button>
        <div className = 'current-month'>{today.getMonth() + 1}</div>
      </BrowserRouter>
      <CalendarView />
    </div>
  )

}

export default Monthly;