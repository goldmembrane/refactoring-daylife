import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import './Home.css';
import Moment from 'react-moment';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date
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
  
            <div className = 'current-Year-and-plans' 
            onClick = {this.goYearly.bind(this)}><Moment format = 'YYYY'>{this.state.date}</Moment></div>
  
            <div className = 'current-Month-and-plans'
            onClick = {this.goMonthly.bind(this)}><Moment format = 'MMM'>{this.state.date}</Moment></div>
            
        </div>
        <div className = 'move-yesterday'>왼쪽</div>
        <div className = 'day-plans'>
          <div className = 'yesterday'><Moment format = 'DD'>{moment(this.state.date).add(-1, 'day')}</Moment></div>
          <div className = 'today'><Moment format = 'DD'>{this.state.date}</Moment></div>
          <div className = 'tomorrow'><Moment format = 'DD'>{moment(this.state.date).add(1, 'day')}</Moment></div>
        </div>
        <div className = 'move-tomorrow'>오른쪽</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.setDateReducer.date
  }
}

export default connect(mapStateToProps)(Home);