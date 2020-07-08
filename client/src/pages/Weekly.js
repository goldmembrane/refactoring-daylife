import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDate } from '../actions';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Moment from 'react-moment';
import moment from 'moment';
import ShowYearPlan from '../Components/ShowYearPlan';
import ShowMonthPlan from '../Components/ShowMonthPlan';
import ShowWeeklyPlan from '../Components/ShowWeeklyPlan';
import CreatePlan from '../Components/CreatePlan';
import { withRouter } from "react-router-dom";


class Weekly extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      date: props.date,
      isModalOpen: false
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  goDaily = () => {
    this.props.history.push('/calendar');
  }

  goMonthly = () => {
    this.props.history.push('/Monthly');
  }

  goYearly = () => {
    this.props.history.push('/Yearly');
  }

  backOneWeek = () => {
    const currentDate = this.props.date;
    const backOneWeek = moment(currentDate).add(-7, 'day');

    this.setState({ date: backOneWeek });
    this.props.dispatch(setDate(backOneWeek));
  }

  forwordOneWeek = () => {
    const currentDate = this.props.date;
    const forwordOneWeek = moment(currentDate).add(7, 'day');

    this.setState({ date: forwordOneWeek });
    this.props.dispatch(setDate(forwordOneWeek));
  }

  handleChangeDate = e => {
    const select = e.target.textContent;
    const selectDay = new Date(select);

  

    this.setState({ date: selectDay });

    this.props.dispatch(setDate(selectDay));
    this.props.history.push('/calendar');
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

        <div className = 'weekly-goals'>
          <ShowWeeklyPlan />
        </div>

        <div className = 'edit'>

          <div className = 'edit-schedules' onClick = {this.openModal.bind(this)}>일정 편집</div>

          <CreatePlan isOpen = {this.state.isModalOpen} 
                      close = {this.closeModal.bind(this)} 
          />

          <div className = 'move-today' onClick = {this.setToday.bind(this)}>오늘로 이동</div>

        </div>

        <div className = 'current-plans'>

          <div className = 'current-Year-and-plans' onClick = {this.goYearly.bind(this)}>
            <p><Moment format = 'YYYY'>{this.state.date}</Moment></p>
            <ShowYearPlan />
          </div>

          <div className = 'current-Month-and-plans' onClick = {this.goMonthly.bind(this)}>
            <p><Moment format = 'MMM'>{this.state.date}</Moment></p>
            <ShowMonthPlan />
          </div>

        </div>

        <button className = 'move-back-week' onClick = {this.backOneWeek.bind(this)}>왼쪽</button>

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

        <button className = 'move-next-week' onClick = {this.forwordOneWeek.bind(this)}>오른쪽</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.setDateReducer.date
  }
}

export default connect(mapStateToProps)(withRouter(Weekly));