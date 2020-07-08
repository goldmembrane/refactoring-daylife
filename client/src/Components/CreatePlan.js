import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePlanDetail from './CreatePlanDetail';

class CreatePlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'goals',
      plan: ''
    }
  this.handleChangePlans = this.handleChangePlans.bind(this);
}

handleChangeFromSelect = event => {
  this.setState({ value: event.currentTarget.value })
}


handleChangePlans = event => {
  this.setState({ plan: event.target.value });
};

render() {

  return (
    this.props.isOpen ?(
        <React.Fragment>
          <div className = 'modal-box'>
            <button className = 'close-button' onClick = {this.props.close}>X</button>
            <div className = 'modal-title-box'>
              <p className = 'modal-title'>일정 편집</p>
            </div>
            <div className = 'modal-content-box'>
              <div className = 'plan-name-box'>
                <label className = 'plan-name'>일정 이름</label>
                <input type = 'text' 
                      className = 'write-plan-name'
                      value = {this.state.plan}
                      onChange = {this.handleChangePlans}></input>
              </div>
              <div className = 'plan-choose-box'>
                <label className = 'plan-choose-title'>분류</label>
                <select className = 'plan-choose' defaultValue = {this.state.value} onChange = {this.handleChangeFromSelect}>
                  <option className = 'plan-choose-name' value = 'goals'>목표</option>
                  <option className = 'plan-choose-name' value = 'schedules'>일일 일정</option>
                </select>
              </div>
                <div className = 'plan-content-detail-box'>
                  <CreatePlanDetail 
                    select = {this.state.value}
                    close = {this.props.close}
                    plan = {this.state.plan}
                  />
                </div>
              </div>
          </div>
        </React.Fragment>
      ): null
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.setPlansReducer.year,
    month: state.setPlansReducer.month,
    week: state.setPlansReducer.week,
    day: state.setPlansReducer.day
  }
}

export default connect(mapStateToProps)(CreatePlan);