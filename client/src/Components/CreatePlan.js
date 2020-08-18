import React, { Component } from "react";
import { connect } from "react-redux";
import CreatePlanDetail from "./CreatePlanDetail";

class CreatePlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "goals",
      plan: "",
    };
    this.handleChangePlans = this.handleChangePlans.bind(this);
  }

  handleChangeFromSelect = (event) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleChangePlans = (event) => {
    this.setState({ plan: event.target.value });
  };

  render() {
    const { plan } = this.state;
    return (
      <React.Fragment>
        <div className="modal-box">
          <div className="modal-title-box">
            <p className="modal-title">일정 생성</p>
          </div>
          <div className="modal-content-box">
            <div className="plan-name-box">
              <label className="plan-name">일정 이름</label>
              <input
                type="text"
                className="write-plan-name"
                value={plan}
                onChange={this.handleChangePlans}
              ></input>
            </div>
            <div className="plan-choose-box">
              <label className="plan-choose-title">분류</label>
              <select
                className="plan-choose"
                defaultValue={this.state.value}
                onChange={this.handleChangeFromSelect}
              >
                <option className="plan-choose-name" value="goals">
                  목표
                </option>
                <option className="plan-choose-name" value="schedules">
                  일일 일정
                </option>
              </select>
            </div>
            <div className="plan-content-detail-box">
              <CreatePlanDetail
                select={this.state.value}
                close={this.props.close}
                plan={plan}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(CreatePlan);
