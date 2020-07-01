import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Calendar from 'rc-calendar';


class Home extends React.Component {
    
  render() {
    const today = new Date();
    return (
     <div>
      <Calendar className = 'calendar' />
      <BrowserRouter>
        <button className = 'go-to-Yearly' onClick = {() => this.props.history.push('/Yearly')}>{today.getFullYear()}</button>
        <button className = 'go-to-Monthly' onClick = {() => this.props.history.push('/Monthly')}>{today.getMonth() + 1}</button>
      </BrowserRouter>
     </div>
    )
  }
}

export default Home;