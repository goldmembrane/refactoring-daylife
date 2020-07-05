import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setDate } from '../actions';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';


class Yearly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: props.date
    }
  }
  
  goDaily = () => {
    this.props.history.push('/');
  }

  goWeekly = () => {
    this.props.history.push('/Weekly');
  }

  goMonthly = () => {
    this.props.history.push('/Monthly');
  }

  handleChangeDate = (event) => {

    const select = event;
    this.setState(() => {
      return { month: select}
    });

    this.props.dispatch(setDate(select));
    this.props.history.push('/Monthly');
  }

  render() {

    return (
      <div>
  
          <DropdownButton id = 'select-button' title = '페이지 이동'>
    
            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goDaily.bind(this)}>일</Dropdown.Item>
    
            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goWeekly.bind(this)}>주</Dropdown.Item>
    
            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goMonthly.bind(this)}>월</Dropdown.Item>
    
          </DropdownButton>
  
        <div className = 'user-name'>user</div>
        <div className = 'edit'>
          <div className = 'edit-schedules'>일정 편집</div>
          <div className = 'move-today'>오늘로 이동</div>
        </div>
        <div className = 'current-plans'>
          <div className = 'current-Year-and-plans-on-Yearly'><Moment format = 'YYYY'>{this.state.month}</Moment></div>
        </div>
          <div className = 'calendar-box-Yearly'>
            <Calendar 
              view = 'year'
              onClickMonth = {this.handleChangeDate.bind(this)}
            />
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.setDateReducer.date
  }
};

export default connect(mapStateToProps)(Yearly);