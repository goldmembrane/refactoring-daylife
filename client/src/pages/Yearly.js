import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import CreatePlan from "../Components/CreatePlan";
import * as getYearGoalsActions from "../modules/GetYearGoals";
import * as setThisDateActions from "../modules/setThisDate";
import { bindActionCreators } from "redux";
import ShowYearPlan from "../Components/ShowYearPlan";
import "./Yearly.css";

class Yearly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: props.date,
    };
  }

  componentDidMount() {
    const { GetYearGoalsActions } = this.props;

    GetYearGoalsActions.getYearGoals();
  }

  goDaily = () => {
    this.props.history.push("/calendar");
  };

  goWeekly = () => {
    this.props.history.push("/Weekly");
  };

  goMonthly = () => {
    this.props.history.push("/Monthly");
  };

  handleChange = (event) => {
    const select = event.activeStartDate;
    this.setState({ month: select });
  };

  handleChangeDate = (event) => {
    const select = event;

    const { SetThisDateActions } = this.props;

    this.setState({ month: select });

    SetThisDateActions.changeDate(select);
    this.props.history.push("/Monthly");
  };

  setToday = () => {
    const today = new Date();
    const { SetThisDateActions } = this.props;

    this.setState({ month: today });

    SetThisDateActions.changeDate(today);
    this.props.history.push("/Yearly");
  };

  render() {
    const { yearGoalData } = this.props;

    return (
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
        <div className="edit"></div>

        <div className="current-Year-and-plans-on-Yearly">
          <Moment format="YYYY">{this.state.month}</Moment>

          {yearGoalData ? (
            yearGoalData.map((data, i) => <ShowYearPlan key={i} {...data} />)
          ) : (
            <h1>no content</h1>
          )}
        </div>
        <Calendar
          view="year"
          className="yearly-calendar"
          onClickMonth={this.handleChangeDate.bind(this)}
          onActiveStartDateChange={this.handleChange}
          defaultValue={this.state.month}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  date: state.setThisDate.date,
  yearGoalData: state.getYearGoals.year,
});

const mapDispatchToProps = (dispatch) => ({
  SetThisDateActions: bindActionCreators(setThisDateActions, dispatch),
  GetYearGoalsActions: bindActionCreators(getYearGoalsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Yearly));
