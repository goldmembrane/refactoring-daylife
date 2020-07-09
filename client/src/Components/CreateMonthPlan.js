import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import * as setThisDateActions from '../modules/setThisDate';
import { bindActionCreators } from 'redux';

class CreateMonthPlan extends Component {
  
  handleChangeMonth = event => {
    const select = event;

    const { SetThisDateActions } = this.props;

    SetThisDateActions.changeDate(select);

  }

  render() {
    const { select, onCreate, close } = this.props;
    const { handleChangeMonth } = this;
    return (
      select === 'monthly' ? (
        <div>
          <button className = 'save' onClick = {() => {onCreate(); close()}}>저장</button>
          <Calendar view = 'year' onClickMonth = {handleChangeMonth} />
        </div>
      ): null
    )
  }
}

const mapStateToProps = state => ({
  date: state.setThisDate.date
});

const mapDispatchToProps = dispatch => ({
  SetThisDateActions: bindActionCreators(setThisDateActions, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMonthPlan);