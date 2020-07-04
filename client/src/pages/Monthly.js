import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    }
  }

  goDaily = () => {
    this.props.history.push('/');
  }

  goWeekly = () => {
    this.props.history.push('/Weekly');
  }

  goYearly = () => {
    this.props.history.push('/Yearly');
  }

  handleChange(event) {
    this.setState({ date: event.target.value });
  }

  render() {
    const { date } = this.props;
    return (
      <div>
        <DropdownButton id = 'select-button' title = '페이지 이동'>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {this.goDaily.bind(this)}>일</Dropdown.Item>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {this.goWeekly.bind(this)}>주</Dropdown.Item>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {this.goYearly.bind(this)}>연도</Dropdown.Item>
  
        </DropdownButton>
        <div className = 'user-name'>user</div>
        <div className = 'edit'>
          <div className = 'edit-schedules'>일정 편집</div>
          <div className = 'move-today'>오늘로 이동</div>
        </div>
        <div className = 'current-plans'>
          <div className = 'current-Year-and-plans'
          onClick = {this.goYearly.bind(this)}>2020</div>
          <div className = 'current-Month-and-plans'>July</div>
        </div>
        <div className = 'calendar-box-Monthly'>
              <Calendar 
              onClickDay = {() => this.handleChange, () => this.props.change(this.state.date)} 
              value = {date}/>
        </div>
      </div>
    )
  }
}

export default Monthly;