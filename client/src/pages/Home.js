import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter, Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      change: this.changeDate.bind(this)
    }
  }
  

  goWeekly = () => {
    this.props.history.push('/Weekly');
  }

  goMonthly = () => {
    this.props.history.push('/Monthly');
  }

  goYearly = () => {
    this.props.history.push('/Yearly');
  }

  changeDate = date => {
    this.setState({ date });
  }

  render() {
    
    return (
      <div>
          <DropdownButton id = 'select-button' title = '페이지 이동'>

            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goWeekly.bind(this)}>주</Dropdown.Item>
    
            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goMonthly.bind(this)}>월</Dropdown.Item>

            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goYearly.bind(this)}>연도</Dropdown.Item>
          </DropdownButton>
        <div className = 'user-name'>user</div>
        <div className = 'edit'>
          <div className = 'edit-schedules'>일정 편집</div>
          <div className = 'move-today'>오늘로 이동</div>
        </div>
        <div className = 'current-plans'>
          <BrowserRouter>
            <Link to = {{
              pathname: './Yearly',
              state: {
                date: this.props.date,
                change: this.props.change
              }
            }}>
            <div className = 'current-Year-and-plans' 
            onClick = {this.goYearly.bind(this)}>2020</div>
            </Link>
            <Link to = {{
              pathname: './Monthly',
              state: {
                date: this.props.date,
                change: this.props.change
              }
            }}>
            <div className = 'current-Month-and-plans'
            onClick = {this.goMonthly.bind(this)}>July</div>
            </Link>
          </BrowserRouter>
        </div>
        <div className = 'move-yesterday'>왼쪽</div>
        <div className = 'day-plans'>
          <div className = 'yesterday'>yesterday</div>
          <div className = 'today'>today</div>
          <div className = 'tomorrow'>tomorrow</div>
        </div>
        <div className = 'move-tomorrow'>오른쪽</div>
      </div>
    )
  }
}

export default Home;