import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Yearly = (props) => {
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
        <div className = 'yearly-schedules'>
          <input type = 'text' className = 'plan-name'></input>
          <textarea className = 'plan-context'></textarea>
          <button type = 'submit'>저장</button>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Yearly;