import React, { Component } from "react";
import { connect } from "react-redux";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Moment from "react-moment";
import moment from "moment";
import ShowYearPlan from "../Components/ShowYearPlan";
import ShowMonthPlan from "../Components/ShowMonthPlan";
import ShowWeeklyPlan from "../Components/ShowWeeklyPlan";
import CreatePlan from "../Components/CreatePlan";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import * as setThisDateActions from "../modules/setThisDate";
import * as getYearGoalsActions from "../modules/GetYearGoals";
import * as getMonthGoalsActions from "../modules/GetMonthGoals";
import * as getWeeklyGoalsActions from "../modules/GetWeeklyPlans";
import { bindActionCreators } from "redux";

class Weekly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date,
      isModalOpen: false,
    };
  }

  componentDidMount() {
    const {
      GetYearGoalsActions,
      GetMonthGoalsActions,
      GetWeeklyGoalsActions,
    } = this.props;

    GetYearGoalsActions.getYearGoals();
    GetMonthGoalsActions.getMonthGoals();
    GetWeeklyGoalsActions.getWeeklyGoals();
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  goDaily = () => {
    this.props.history.push("/calendar");
  };

  goMonthly = () => {
    this.props.history.push("/Monthly");
  };

  goYearly = () => {
    this.props.history.push("/Yearly");
  };

  backOneWeek = () => {
    const currentDate = this.props.date;

    const { SetThisDateActions } = this.props;
    const backOneWeek = moment(currentDate).add(-7, "day");

    this.setState({ date: backOneWeek });
    SetThisDateActions.changeDate(backOneWeek);
  };

  forwordOneWeek = () => {
    const currentDate = this.props.date;
    const { SetThisDateActions } = this.props;
    const forwordOneWeek = moment(currentDate).add(7, "day");

    this.setState({ date: forwordOneWeek });
    SetThisDateActions.changeDate(forwordOneWeek);
  };

  handleChangeDate = (e) => {
    const select = e.target.textContent;
    const selectDay = new Date(select);

    const { SetThisDateActions } = this.props;

    this.setState({ date: selectDay });

    SetThisDateActions.changeDate(selectDay);
    this.props.history.push("/calendar");
  };

  setToday = () => {
    const { SetThisDateActions } = this.props;
    const today = new Date();

    const nowMonth = today.getMonth();
    const nowYear = today.getFullYear();
    const nowDay = today.getDay();
    const nowDate = today.getDate();

    const weekStartFromToDay = new Date(nowYear, nowMonth, nowDate - nowDay);

    this.setState({ date: weekStartFromToDay });

    SetThisDateActions.changeDate(weekStartFromToDay);
  };

  render() {
    const { yearGoalData, monthGoalData, weeklyGoalData } = this.props;
    return (
      <div>
        <DropdownButton id="select-button" title="페이지 이동▼">
          <Dropdown.Item
            className="option"
            as="button"
            onClick={this.goMonthly.bind(this)}
          >
            월
          </Dropdown.Item>

          <Dropdown.Item
            className="option"
            as="button"
            onClick={this.goYearly.bind(this)}
          >
            연도
          </Dropdown.Item>
        </DropdownButton>

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
        <div className="edit"></div>

        <div className="current-plans">
          <div
            className="current-Year-and-plans"
            onClick={this.goYearly.bind(this)}
          >
            <p>
              <Moment format="YYYY">{this.state.date}</Moment>
            </p>

            {yearGoalData ? (
              yearGoalData.map((data, i) => <ShowYearPlan key={i} {...data} />)
            ) : (
              <h1>no content</h1>
            )}
          </div>

          <div
            className="current-Month-and-plans"
            onClick={this.goMonthly.bind(this)}
          >
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

        <div className="weekly-plans">
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">{this.state.date}</Moment>
          </div>
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(1, "day")}
            </Moment>
          </div>
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(2, "day")}
            </Moment>
          </div>
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(3, "day")}
            </Moment>
          </div>
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(4, "day")}
            </Moment>
          </div>
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(5, "day")}
            </Moment>
          </div>
          <div
            className="daily-plans"
            onClick={this.handleChangeDate.bind(this)}
          >
            <Moment format="YYYY-MM-DD">
              {moment(this.state.date).add(6, "day")}
            </Moment>
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
  weeklyGoalData: state.getWeeklyGoals.week,
});

const mapDispatchToProps = (dispatch) => ({
  SetThisDateActions: bindActionCreators(setThisDateActions, dispatch),
  GetYearGoalsActions: bindActionCreators(getYearGoalsActions, dispatch),
  GetMonthGoalsActions: bindActionCreators(getMonthGoalsActions, dispatch),
  GetWeeklyGoalsActions: bindActionCreators(getWeeklyGoalsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Weekly));
