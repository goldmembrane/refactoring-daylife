import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import moment from "moment";
import CreatePlan from "./create/CreatePlan";
import ShowYearPlan from "./show/ShowYearPlan";
import ShowMonthPlan from "./show/ShowMonthPlan";
import ShowDailyPlan from "./show/ShowDailyPlan";
import Popup from "reactjs-popup";
import * as setThisDateActions from "../modules/setThisDate";
import * as getYearGoalsActions from "../modules/GetYearGoals";
import * as getMonthGoalsActions from "../modules/GetMonthGoals";
import * as getDailySchedulesActions from "../modules/GetDailySchedules";
import { bindActionCreators } from "redux";

class DailyPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date,
      weekDay: new Date(),
    };
  }

  componentDidMount() {
    const {
      GetYearGoalsActions,
      GetMonthGoalsActions,
      GetDailySchedulesActions,
    } = this.props;

    GetYearGoalsActions.getYearGoals();
    GetMonthGoalsActions.getMonthGoals();
    GetDailySchedulesActions.getSchedules();
  }

  changeToday = (e) => {
    const select = e.target.textContent;
    const { SetThisDateActions } = this.props;
    const selectDay = new Date(select);
    this.setState({ date: selectDay });

    SetThisDateActions.changeDate(selectDay);
  };

  backThreeDays = () => {
    const { SetThisDateActions } = this.props;
    const currentDate = this.props.date;
    const backThreeDate = moment(currentDate).add(-3, "day");
    this.setState({ date: backThreeDate });

    SetThisDateActions.changeDate(backThreeDate);
  };

  forwordThreeDays = () => {
    const { SetThisDateActions } = this.props;
    const currentDate = this.props.date;
    const forwordThreeDate = moment(currentDate).add(3, "day");
    this.setState({ date: forwordThreeDate });

    SetThisDateActions.changeDate(forwordThreeDate);
  };

  sendPropsToWeekly = (e) => {
    const select = e.target.textContent;
    const { SetThisDateActions } = this.props;
    const selectToday = new Date(select);

    const nowMonth = selectToday.getMonth();
    const nowYear = selectToday.getFullYear();
    const nowDay = selectToday.getDay();
    const nowDate = selectToday.getDate();

    const weekStartDay = new Date(nowYear, nowMonth, nowDate - nowDay);

    SetThisDateActions.changeDate(weekStartDay);
  };

  setToday = () => {
    const { SetThisDateActions } = this.props;
    const today = new Date();
    this.setState({ date: today });

    SetThisDateActions.changeDate(today);
  };

  render() {
    const { yearGoalData, monthGoalData, scheduleData } = this.props;
    return (
      <div>
        <div>
          <Popup
            trigger={<button className="show-popup">일정 생성</button>}
            position="right center"
            modal={true}
            contentStyle={{ maxWidth: "600px", width: "90%", height: "80%" }}
          >
            {(close) => (
              <div>
                <div className="close" onClick={close}>
                  X
                </div>
                <CreatePlan close={close} />
              </div>
            )}
          </Popup>

          <span className="move-today" onClick={this.setToday.bind(this)}>
            오늘로 이동
          </span>
        </div>
        <div className="current-plans" id="current-plans-calendar">
          <div className="current-Year-and-plans" onClick={this.props.goYear}>
            <p>
              <Moment format="YYYY">{this.state.date}</Moment>
            </p>

            {yearGoalData ? (
              yearGoalData.map((data, i) => <ShowYearPlan key={i} {...data} />)
            ) : (
              <h1>no content</h1>
            )}
          </div>

          <div className="current-Month-and-plans" onClick={this.props.goMonth}>
            <p>
              <Moment format="MMM">{this.state.date}</Moment>
            </p>

            {monthGoalData ? (
              monthGoalData.map((data, i) => (
                <ShowMonthPlan key={i} {...data} />
              ))
            ) : (
              <h1>no content</h1>
            )}
          </div>
        </div>

        <div className="day-plans">
          <div className="yesterday" onClick={this.changeToday.bind(this)}>
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(-1, "day")}
            </Moment>

            {scheduleData ? (
              scheduleData.map((data, i) => <ShowDailyPlan key={i} {...data} />)
            ) : (
              <h1>no content</h1>
            )}
          </div>

          <div
            className="today"
            onClick={(e) => {
              this.sendPropsToWeekly(e);
              this.props.goWeek();
            }}
          >
            <Moment format="YYYY-MM-DD">{this.state.date}</Moment>

            {scheduleData ? (
              scheduleData.map((data, i) => <ShowDailyPlan key={i} {...data} />)
            ) : (
              <h1>no content</h1>
            )}
          </div>

          <div className="tomorrow" onClick={this.changeToday.bind(this)}>
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(1, "day")}
            </Moment>

            {scheduleData ? (
              scheduleData.map((data, i) => <ShowDailyPlan key={i} {...data} />)
            ) : (
              <h1>no content</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  date: state.setThisDate.date,
  yearGoalData: state.getYearGoals.year,
  monthGoalData: state.getMonthGoals.month,
  scheduleData: state.getSchedules.data,
});

const mapDispatchToProps = (dispatch) => ({
  SetThisDateActions: bindActionCreators(setThisDateActions, dispatch),
  GetYearGoalsActions: bindActionCreators(getYearGoalsActions, dispatch),
  GetMonthGoalsActions: bindActionCreators(getMonthGoalsActions, dispatch),
  GetDailySchedulesActions: bindActionCreators(
    getDailySchedulesActions,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyPlan);
