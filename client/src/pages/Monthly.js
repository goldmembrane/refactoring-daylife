import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import CreatePlan from "../Components/CreatePlan";
import { bindActionCreators } from "redux";
import * as getYearGoalsActions from "../modules/GetYearGoals";
import * as getMonthGoalsActions from "../modules/GetMonthGoals";
import * as setThisDateActions from "../modules/setThisDate";
import ShowMonthPlan from "../Components/ShowMonthPlan";
import ShowYearPlan from "../Components/ShowYearPlan";
import "./Monthly.css";

class Monthly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date,
    };
  }

  componentDidMount() {
    const { GetYearGoalsActions, GetMonthGoalsActions } = this.props;

    GetYearGoalsActions.getYearGoals();
    GetMonthGoalsActions.getMonthGoals();
  }

  goDaily = () => {
    this.props.history.push("/calendar");
  };

  goWeekly = () => {
    this.props.history.push("/Weekly");
  };

  goYearly = () => {
    this.props.history.push("/Yearly");
  };

  handleChange = (event) => {
    const select = event.activeStartDate;
    this.setState({ date: select });
  };

  handleChangeDate = (event) => {
    const select = event;
    const { SetThisDateActions } = this.props;
    this.setState({
      date: select,
    });

    SetThisDateActions.changeDate(select);
    this.props.history.push("/calendar");
  };

  setToday = () => {
    const today = new Date();
    const { SetThisDateActions } = this.props;
    this.setState({ date: today });

    SetThisDateActions.changeDate(today);
    this.props.history.push("/Monthly");
  };

  render() {
    const { yearGoalData, monthGoalData } = this.props;
    return (
      <div>
        <div>
          <Popup
            trigger={<button id="show-popup-monthly">일정 생성</button>}
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
          <div
            className="current-Year-and-plans"
            onClick={this.goYearly.bind(this)}
          >
            <Moment format="YYYY">{this.state.date}</Moment>

            {yearGoalData ? (
              yearGoalData.map((data, i) => <ShowYearPlan key={i} {...data} />)
            ) : (
              <h1>no content</h1>
            )}
          </div>

          <div className="current-Month-and-plans">
            <Moment format="MMM">{this.state.date}</Moment>

            {monthGoalData ? (
              monthGoalData.map((data, i) => (
                <ShowMonthPlan key={i} {...data} />
              ))
            ) : (
              <h1>no content</h1>
            )}
          </div>
        </div>
        <Calendar
          className="monthly-calendar"
          onClickDay={this.handleChangeDate.bind(this)}
          onActiveStartDateChange={this.handleChange}
          defaultValue={this.state.date}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  date: state.setThisDate.date,
  yearGoalData: state.getYearGoals.year,
  monthGoalData: state.getMonthGoals.month,
});

const mapDispatchToProps = (dispatch) => ({
  SetThisDateActions: bindActionCreators(setThisDateActions, dispatch),
  GetYearGoalsActions: bindActionCreators(getYearGoalsActions, dispatch),
  GetMonthGoalsActions: bindActionCreators(getMonthGoalsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Monthly));
