import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import './Home.css';
import { DailyPlan } from '../components'


class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: props.date
    }
  }

  goWeekly = () => {
    this.props.history.push('/Weekly');
  }

  goMonthly = () => {
    this.props.history.push('/Monthly');
  }

  goYearly = () => {
    this.props.history.push('/Yearly');
  }

  render() {

    return (
      <div>
        
          <DropdownButton id = 'select-button' title = '페이지 이동'>
            
            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goMonthly.bind(this)}>월</Dropdown.Item>
  
            <Dropdown.Item className = 'option' as = 'button'
            onClick = {this.goYearly.bind(this)}>연도</Dropdown.Item>
  
          </DropdownButton>
  
        <div className = 'user-name'>user</div>
          <DailyPlan 
          goYear = {this.goYearly.bind(this)}
          goMonth = {this.goMonthly.bind(this)}
          goWeek = {this.goWeekly.bind(this)}
          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.setDateReducer.date
  }
}

export default connect(mapStateToProps)(Home);