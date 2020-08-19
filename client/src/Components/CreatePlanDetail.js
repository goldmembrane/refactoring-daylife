import React, { Component } from "react";
import { connect } from "react-redux";
import TimePicker from "react-time-picker";
import CreateYearPlan from "./CreateYearPlan";
import CreateMonthPlan from "./CreateMonthPlan";
import CreateWeekPlan from "./CreateWeekPlan";
import * as postSchedulesActions from "../modules/PostDailySchedules";
import * as postGoalsActions from "../modules/PostGoals";
import * as setThisDateActions from "../modules/setThisDate";
import { bindActionCreators } from "redux";
import moment from "moment";
import "./CreatePlanDetail.css";

class CreatePlanDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: "00:00",
      endTime: "23:00",
      value: "annually",
    };
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleChangeFromSelect = this.handleChangeFromSelect.bind(this);
  }

  handleChangeFromSelect = (event) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleChangeStartTime = (event) => {
    const selectTime = event.target;
    this.setState({ startTime: selectTime });
  };

  handleChangeEndTime = (event) => {
    const selectTime = event.target;
    this.setState({ endTime: selectTime });
  };

  handleYearGoalCreate = () => {
    const { plan, PostGoalsActions, date } = this.props;
    const { value } = this.state;

    const year = moment(date).format("YYYY");

    PostGoalsActions.postGoals({ name: plan, year: year, category: value });
  };

  handleMonthGoalCreate = () => {
    const { plan, PostGoalsActions, date } = this.props;
    const { value } = this.state;

    const year = moment(date).format("YYYY");
    const day = moment(date).format("MM");

    PostGoalsActions.postGoals({
      name: plan,
      year: year,
      day: day,
      category: value,
    });
  };

  handleWeekGoalCreate = () => {
    const { plan, PostGoalsActions, date } = this.props;
    const { value } = this.state;

    const year = moment(date).format("YYYY");
    const day = moment(date).format("ww");

    PostGoalsActions.postGoals({
      name: plan,
      year: year,
      day: day,
      category: value,
    });
  };

  handleSchedulesCreate = () => {
    const { start, end } = this.state;
    const today = new Date();
    const { plan, PostSchedulesActions } = this.props;

    const startTime = moment(start).format("HH:mm");
    const endTime = moment(end).format("HH:mm");
    const formatDate = moment(today).format("YYYY-MM-DD");

    PostSchedulesActions.postSchedules({
      name: plan,
      start: startTime,
      end: endTime,
      date: formatDate,
    });
  };

  render() {
    const { close } = this.props;
    const {
      handleYearGoalCreate,
      handleMonthGoalCreate,
      handleWeekGoalCreate,
      handleSchedulesCreate,
    } = this;

    return this.props.select === "goals" ? (
      <div className="plan-content-detail">
        <div className="goals-category-box">
          <label className="goals-category-title">일정 기간 분류</label>
          <select
            className="goals-category"
            defaultValue={this.state.value}
            onChange={this.handleChangeFromSelect}
          >
            <option className="yearly-plan" value="annually">
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
          close={close}
          select={this.state.value}
          onCreate={handleYearGoalCreate}
        />
        <CreateMonthPlan
          close={close}
          select={this.state.value}
          onCreate={handleMonthGoalCreate}
        />
        <CreateWeekPlan
          close={close}
          select={this.state.value}
          onCreate={handleWeekGoalCreate}
        />
      </div>
    ) : (
      <div className="schedules-content-detail">
        <div className="set-schedules-time-box">
          <label className="start-time-title">시작 시간</label>
          <TimePicker
            className="start-time"
            value={this.state.startTime}
            clockIcon={null}
            disableClock={true}
            onChange={this.handleChangeStartTime}
          />
          <label className="end-time-title">끝나는 시간</label>
          <TimePicker
            className="end-time"
            value={this.state.endTime}
            clockIcon={null}
            disableClock={true}
            onChange={this.handleChangeEndTime}
          />
        </div>
        <button
          className="save"
          onClick={() => {
            handleSchedulesCreate();
            close();
          }}
        >
          저장
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scheduleData: state.postSchedules.data,
  goalData: state.postGoals.data,
  date: state.setThisDate.date,
});

const mapDispatchToProps = (dispatch) => ({
  PostSchedulesActions: bindActionCreators(postSchedulesActions, dispatch),
  PostGoalsActions: bindActionCreators(postGoalsActions, dispatch),
  SetThisDateActions: bindActionCreators(setThisDateActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanDetail);
