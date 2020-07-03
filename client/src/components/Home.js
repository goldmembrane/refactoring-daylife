import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './Home.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Home extends React.Component {
    
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
        </DropdownButton>
        <BrowserRouter>
          <div className = 'go-to-Yearly'>{today.getFullYear()}</div>
          <div className = 'go-to-Monthly'>{today.getMonth() + 1}</div>
          <div className = 'yesterday day'>Yesterday</div>
          <div className = 'today day'>Today</div>
          <div className = 'tomorrow day'>Tomorrow</div>
        </BrowserRouter>
     </div>
    )
  }
}


export default Home;