import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDate } from '../actions';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'react-moment';
import moment from 'moment';


class Weekly extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      date: props.date
    }
  }

  goDaily = () => {
    this.props.history.push('/');
  }

  goMonthly = () => {
    this.props.history.push('/Monthly');
  }

  goYearly = () => {
    this.props.history.push('/Yearly');
  }

  handleChangeDate = (e) => {
    const select = e.target.textContent;
    const selectDay = new Date(select);

  

    this.setState({ date: selectDay });

    this.props.dispatch(setDate(selectDay));
    this.props.history.push('/');
  }

  setToday = () => {

    const today = new Date();
    this.setState({ date: today });

    this.props.dispatch(setDate(today));

  }

  

  render() {

    return (
      <div>
        <DropdownButton id = 'select-button' title = '페이지 이동'>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {this.goMonthly.bind(this)}>월</Dropdown.Item>
  
          <Dropdown.Item className = 'option' as = 'button'
          onClick = {this.goYearly.bind(this)}>연도</Dropdown.Item>
  
        </DropdownButton>
        <div className = 'user-name'>user</div>
        <div className = 'weekly-goals'>이번주 목표</div>
        <div className = 'edit'>
          <div className = 'edit-schedules'>일정 편집</div>
          <div className = 'move-today' onClick = {this.setToday.bind(this)}>오늘로 이동</div>
        </div>
        <div className = 'current-plans'>

          <div className = 'current-Year-and-plans'
          onClick = {this.goYearly.bind(this)}>
            <Moment format = 'YYYY'>{this.state.date}</Moment>
          </div>

          <div className = 'current-Month-and-plans'
          onClick = {this.goMonthly.bind(this)}>
            <Moment format = 'MMM'>{this.state.date}</Moment>
          </div>

        </div>
        <div className = 'weekly-plans'>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{this.state.date}</Moment>
          </div>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(1, 'day')}</Moment>
          </div>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(2, 'day')}</Moment>
          </div>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(3, 'day')}</Moment>
          </div>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(4, 'day')}</Moment>
          </div>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(5, 'day')}</Moment>
          </div>
          <div className = 'daily-plans' onClick = {this.handleChangeDate.bind(this)}>
              <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(6, 'day')}</Moment>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.setDateReducer.date
  }
}

export default connect(mapStateToProps)(Weekly);