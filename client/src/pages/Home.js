import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Moment from 'react-moment';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../components/Home.css';

class Home extends React.Component {
  state = {
    date: new Date(),
    
  }

  render() {
    const today = new Date();
    return (
      <div>
        <DropdownButton id = 'dropdown-basic-button' title = '페이지 이동 : 3일'>

          <Dropdown.Item className = 'dropdown-item' as = 'button' 
            onClick = {() => this.props.history.push('/Weekly')}>주</Dropdown.Item>

          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => this.props.history.push('/Monthly')}>월</Dropdown.Item>

          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => this.props.history.push('/Yearly')}>연도</Dropdown.Item>

          <Dropdown.Item className = 'dropdown-item' as = 'button'
            onClick = {() => this.props.history.push('/')}>3일</Dropdown.Item>

        </DropdownButton>
        <BrowserRouter>
          <button className = 'go-to-Yearly' onClick = {() => this.props.history.push('Yearly')}>
            <Moment format = 'YYYY'>{today}</Moment></button>
          <button className = 'go-to-Monthly' onClick = {() => this.props.history.push('Monthly')}>
            <Moment format = 'MMMM'>{today}</Moment></button>
          <div className = 'daily day'><Moment format = 'DD'>{today.getDate() - 1}</Moment></div>
          <div className = 'daily day'><Moment format = 'DD'>{today}</Moment></div>
          <div className = 'daily day'><Moment format = 'DD'>{today.getDate() + 1}</Moment></div>
        </BrowserRouter>
      </div>
    )
  }
}



export default Home;