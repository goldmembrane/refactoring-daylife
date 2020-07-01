import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const Weekly = (props) => {
  return (
    <div>
      <BrowserRouter>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day1</button>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day2</button>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day3</button>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day4</button>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day5</button>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day6</button>
        <button className = 'go-to-daily' onClick = {() => props.history.push('/daily')}>day7</button>
      </BrowserRouter>
    </div>
  )
}

export default Weekly;