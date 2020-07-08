import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { setDate } from '../actions';
import moment from 'moment';
import CreatePlan from './CreatePlan';
import ShowYearPlan from './ShowYearPlan';
import ShowMonthPlan from './ShowMonthPlan';

class DailyPlan extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: props.date,
      weekDay: new Date(),
      isModalOpen: false
    }
  }
  

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }


  changeToday = e => {
    const select = e.target.textContent;
    const selectDay = new Date(select);
    this.setState({ date: selectDay});

    this.props.dispatch(setDate(selectDay));
  }

  backThreeDays = () => {
    const currentDate = props.date;
    const backThreeDate = moment(currentDate).add(-3, 'day');
    this.setState({ date: backThreeDate });

    this.props.dispatch(setDate(backThreeDate));
  }

  forwordThreeDays = () => {
    const currentDate = props.date;
    const forwordThreeDate = moment(currentDate).add(3, 'day');
    this.setState({ date: forwordThreeDate });

    this.props.dispatch(setDate(forwordThreeDate));
  }

  sendPropsToWeekly = e => {

    const select = e.target.textContent;
    const selectToday = new Date(select);
    
    const nowMonth = selectToday.getMonth();
    const nowYear = selectToday.getFullYear();
    const nowDay = selectToday.getDay();
    const nowDate = selectToday.getDate();

    const weekStartDay = new Date(nowYear, nowMonth, nowDate - nowDay);

    this.props.dispatch(setDate(weekStartDay));


  }

  

  setToday = () => {
    const today = new Date();
    this.setState({ date: today });

    this.props.dispatch(setDate(today));
  }

  render() {

    return(

      <div>
        <div className = 'edit'>

          <div className = 'edit-schedules' onClick = {this.openModal.bind(this)}>일정 편집</div>
          <CreatePlan isOpen = {this.state.isModalOpen} 
                      close = {this.closeModal.bind(this)} 
          />

          <div className = 'move-today' onClick = {this.setToday.bind(this)}>오늘로 이동</div>

        </div>
        <div className = 'current-plans'>
  
            <div className = 'current-Year-and-plans' onClick = {this.props.goYear}>
              <p><Moment format = 'YYYY'>{this.state.date}</Moment></p>
              <ShowYearPlan />
            </div>
  
            <div className = 'current-Month-and-plans' onClick = {this.props.goMonth}>
              <p><Moment format = 'MMM'>{this.state.date}</Moment></p>
              <ShowMonthPlan />
            </div>
          
        </div>

        <div className = 'move-back-three-days' onClick = {this.backThreeDays.bind(this)}>왼쪽</div>

        <div className = 'day-plans'>

          <div className = 'yesterday' onClick = {this.changeToday.bind(this)}>
            <Moment format = 'YYYY-MM-DD' >{moment(this.state.date).add(-1, 'day')}</Moment>
          </div>

          <div className = 'today' onClick = {(e) => { this.sendPropsToWeekly(e); this.props.goWeek();}} >
            <Moment format = 'YYYY-MM-DD'>{this.state.date}</Moment>
          </div>

          <div className = 'tomorrow' onClick = {this.changeToday.bind(this)}>
            <Moment format = 'YYYY-MM-DD'>{moment(this.state.date).add(1, 'day')}</Moment>
          </div>

      </div>

      <div className = 'move-forword-three-days' onClick = {this.forwordThreeDays.bind(this)}>오른쪽</div>

    </div>
    )
  }
}
const mapStateToProps = state => {
    return {
      date: state.setDateReducer.date,
      year: state.setPlansReducer.year
    }
  }

export default connect(mapStateToProps)(DailyPlan);