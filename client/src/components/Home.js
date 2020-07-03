import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './Home.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'react-moment';

const Home = (props) => {

  return (
    <div>
      <DropdownButton id = 'dropdown-basic-button' title = '페이지 이동 : 3일'>
        <Dropdown.Item className = 'dropdown-item' as = 'button'
          onClick = {() => props.history.push('/Weekly')}>주</Dropdown.Item>
        <Dropdown.Item className = 'dropdown-item' as = 'button'
          onClick = {() => props.history.push('/Monthly')}>월</Dropdown.Item>
        <Dropdown.Item className = 'dropdown-item' as = 'button'
          onClick = {() => props.history.push('/Yearly')}>연도</Dropdown.Item>
      </DropdownButton>
      <BrowserRouter>
        <button className = 'go-to-Yearly' onClick = {() => props.history.push('Yearly')}>
          <Moment format = 'YYYY'>{props.value}</Moment></button>
        <button className = 'go-to-Monthly' onClick = {() => props.history.push('Monthly')}>
          <Moment format = 'MMMM'>{props.value}</Moment></button>
        <div className = 'daily day'>Yesterday</div>
        <div className = 'daily day'>Today</div>
        <div className = 'daily day'>Tomorrow</div>
      </BrowserRouter>
    </div>
  )
}



export default Home;