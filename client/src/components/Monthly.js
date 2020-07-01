import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const Monthly = (props) => {
  const today = new Date();
  return (
    <div>
      <BrowserRouter>
        <button className = 'go-to-Yearly' onClick = {() => props.history.push('/Yearly')}>{today.getFullYear()}</button>
        <div className = 'current-month'>{today.getMonth() + 1}</div>
        <button className = 'go-to-weekly' onClick = {() => props.history.push('Weekly')}>Week 1</button>
        <button className = 'go-to-weekly' onClick = {() => props.history.push('Weekly')}>Week 2</button>
        <button className = 'go-to-weekly' onClick = {() => props.history.push('Weekly')}>Week 3</button>
        <button className = 'go-to-weekly' onClick = {() => props.history.push('Weekly')}>Week 4</button>
        <button className = 'go-to-weekly' onClick = {() => props.history.push('Weekly')}>Week 5</button>
      </BrowserRouter>
    </div>
  )

}

export default Monthly;