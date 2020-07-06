import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { setDate } from '../actions';
import moment from 'moment';

class DailyPlan extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: props.date,
      weekDay: new Date()
    }
  }

  changeToday = (e) => {
    const select = e.target.textContent;
    const selectDay = new Date(select);
    this.setState({ date: selectDay});

    this.props.dispatch(setDate(selectDay));
  }

  sendPropsToWeekly = (e) => {

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
          <div className = 'edit-schedules'>일정 편집</div>
          <div className = 'move-today' onClick = {this.setToday.bind(this)}>오늘로 이동</div>
        </div>
        <div className = 'current-plans'>
  
            <div className = 'current-Year-and-plans' 
            onClick = {this.props.goYear}><Moment format = 'YYYY'>{this.state.date}</Moment></div>
  
            <div className = 'current-Month-and-plans'
            onClick = {this.props.goMonth}><Moment format = 'MMM'>{this.state.date}</Moment></div>
          
        </div>
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
    </div>
    )
  }
}
const mapStateToProps = state => {
    return {
      date: state.setDateReducer.date
    }
  }

export default connect(mapStateToProps)(DailyPlan);