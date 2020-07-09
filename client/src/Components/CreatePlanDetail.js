import React, { Component } from "react";
import { connect } from "react-redux";
import { setStartTime, setEndTime } from "../actions";
import TimePicker from "react-time-picker";
import CreateYearPlan from "./CreateYearPlan";
import CreateMonthPlan from "./CreateMonthPlan";
import CreateWeekPlan from "./CreateWeekPlan";
import { setDayPlan } from "../actions";

class CreatePlanDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: "00:00",
      endTime: "23:00",
      value: "yearly",
    };
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.saveChangeTime = this.saveChangeTime.bind(this);
    this.handleChangeFromSelect = this.handleChangeFromSelect.bind(this);
  }

  sendDayPlans = () => {
    this.props.dispatch(setDayPlan(this.props.plan));
  };

  handleChangeFromSelect = (event) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleChangeStartTime = (event) => {
    const selectTime = event;
    this.setState({ startTime: selectTime });
  };

  handleChangeEndTime = (event) => {
    const selectTime = event;
    this.setState({ endTime: selectTime });
  };

  saveChangeTime = () => {
    this.props.dispatch(setStartTime(this.state.startTime));
    this.props.dispatch(setEndTime(this.state.endTime));
  };

  render() {
    return this.props.select === "goals" ? (
      <div className="plan-content-detail">
        <div className="goals-category-box">
          <label className="goals-category-title">일정 기간 분류</label>
          <select
            className="goals-category"
            defaultValue={this.state.value}
            onChange={this.handleChangeFromSelect}
          >
            <option className="yearly-plan" value="yearly">
              Yearly
            </option>
            <option className="monthly-plan" value="monthly">
              Monthly
            </option>
            <option className="weekly-plan" value="weekly">
              Weekly
            </option>
          </select>
        </div>
        <CreateYearPlan
          plan={this.props.plan}
          close={this.props.close}
          select={this.state.value}
        />
        <CreateMonthPlan
          plan={this.props.plan}
          close={this.props.close}
          select={this.state.value}
        />
        <CreateWeekPlan
          plan={this.props.plan}
          close={this.props.close}
          select={this.state.value}
        />
      </div>
    ) : (
      <div className="schedules-content-detail">
        <div className="set-schedules-time-box">
          <label className="start-time-title">시작 시간</label>
          <TimePicker
            value={this.state.startTime}
            clockIcon={null}
            disableClock={true}
            onChange={this.handleChangeStartTime}
          />
          <label className="end-time-title">끝나는 시간</label>
          <TimePicker
            value={this.state.endTime}
            clockIcon={null}
            disableClock={true}
            onChange={this.handleChangeEndTime}
          />
        </div>
        <button
          className="save"
          onClick={() => {
            this.saveChangeTime();
            this.sendDayPlans();
            this.props.close();
          }}
        >
          저장
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    start: state.setScheduleTimeReducer.start,
    end: state.setScheduleTimeReducer.end,
  };
};

export default connect(mapStateToProps)(CreatePlanDetail);
