import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Yearly from './components/Yearly';
import Monthly from './components/Monthly';
import Calendar from 'rc-calendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthList: ['JANUARY', 'FEBURAY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
    }
  }

  render() {
    const today = new Date();
    return (
      <BrowserRouter>
        <div className = 'calendar'>
          <Calendar />
        </div>
        <Link to = '/App'>홈</Link>
        <Link to = '/Yearly'>{today.getFullYear()}</Link>
        <Link to = '/Monthly'>{this.state.monthList[today.getMonth()]}</Link>
        <Route exact path = '/' component = {App}/>
        <Switch>
          <Route path = '/Yearly' component = {Yearly}/>
          <Route path = '/Monthly' component = {Monthly}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
