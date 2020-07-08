import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';
import CreateYearPlan from './CreateYearPlan';
import CreateMonthPlan from './CreateMonthPlan';
import CreateWeekPlan from './CreateWeekPlan';
import * as postSchedulesActions from '../modules/PostDailySchedules';
import * as postGoalsActions from '../modules/PostGoals';
import { bindActionCreators } from 'redux';

class CreatePlanDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: '00:00',
      endTime: '23:00',
      value: 'yearly'
    }
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleChangeFromSelect = this.handleChangeFromSelect.bind(this);
  }

  handleChangeFromSelect = event => {
    this.setState({ value: event.currentTarget.value });
  }


  handleChangeStartTime = event => {

    const selectTime = event;
    this.setState({ startTime: selectTime });

  };

  handleChangeEndTime = event => {

    const selectTime = event;
    this.setState({ endTime: selectTime });

  };

  handleGoalCreate = () => {

    const { plan, PostGoalsActions } = this.props;

    PostGoalsActions.postGoals({ name: plan });

  }

  handleSchedulesCreate = () => {

    const { start, end } = this.state;

    const { plan, PostSchedulesActions } = this.props;

    PostSchedulesActions.postSchedules({ name: plan , start: start, end: end });
  }

  render() {
    const { close } = this.props;
    const { handleGoalCreate, handleSchedulesCreate } = this;

    return (
      this.props.select === 'goals' ? (
        <div className = 'plan-content-detail'>
          <div className = 'goals-category-box'>
            <label className = 'goals-category-title'>일정 기간 분류</label>
            <select className = 'goals-category' 
                    defaultValue = {this.state.value}
                    onChange = {this.handleChangeFromSelect}>
              <option className = 'yearly-plan' value = 'yearly'>Yearly</option>
              <option className = 'monthly-plan' value = 'monthly'>Monthly</option>
              <option className = 'weekly-plan' value = 'weekly'>Weekly</option>
            </select>
          </div>
          <CreateYearPlan 
            close = {close}
            select = {this.state.value}
            onCreate = {handleGoalCreate}
          />
          <CreateMonthPlan
            close = {close}
            select = {this.state.value}
            onCreate = {handleGoalCreate}
          />
          <CreateWeekPlan
            close = {close}
            select = {this.state.value}
            onCreate = {handleGoalCreate}
          />
        </div>
      ) : 
      (
        <div className = 'schedules-content-detail'>
          <div className = 'set-schedules-time-box'>
            <label className = 'start-time-title'>시작 시간</label>
            <TimePicker 
              value = {this.state.startTime}
              clockIcon = {null}
              disableClock = {true}
              onChange = {this.handleChangeStartTime}
            />
            <label className = 'end-time-title'>끝나는 시간</label>
            <TimePicker 
              value = {this.state.endTime}
              clockIcon = {null}
              disableClock = {true}
              onChange = {this.handleChangeEndTime}
            />
          </div>
          <button className = 'save' onClick = {() => {handleSchedulesCreate(); close()}}>저장</button>
        </div>
      )
    )
  }
}


export default connect(
  state => ({
    scheduleData: state.postSchedules.data,
    goalData: state.postGoals.data
  }),
  dispatch => ({
    PostSchedulesActions: bindActionCreators(postSchedulesActions, dispatch),
    PostGoalsActions: bindActionCreators(postGoalsActions, dispatch)
  })
)(CreatePlanDetail);