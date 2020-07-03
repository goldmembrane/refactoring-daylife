import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Weekly.css';
import Moment from 'react-moment';

const Weekly = (props) => {
  const today = new Date();
  return (
    <div>
      <DropdownButton id = 'dropdown-basic-button' title = '페이지 이동 : 주'>
        <Dropdown.Item className = 'dropdown-item' as = 'button'
          onClick = {() => props.history.push('/')}>3일</Dropdown.Item>
        <Dropdown.Item className = 'dropdown-item' as = 'button'
          onClick = {() => props.history.push('/Monthly')}>월</Dropdown.Item>
        <Dropdown.Item className = 'dropdown-item' as = 'button'
          onClick = {() => props.history.push('/Yearly')}>연도</Dropdown.Item>
      </DropdownButton>
      <BrowserRouter>
        <button className = 'go-to-Yearly' onClick = {() => props.history.push('/Yearly')}>{today.getFullYear()}</button>
        <button className = 'go-to-Monthly' onClick = {() => props.history.push('/Monthly')}>
          <Moment format = 'MMMM'>{today}</Moment></button>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>일</div>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>월</div>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>화</div>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>수</div>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>목</div>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>금</div>
        <div className = 'day-list' onClick = {() => props.history.push('/')}>토</div>
      </BrowserRouter>
    </div>
  )
}

export default Weekly;