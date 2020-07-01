import React from 'react';

const Yearly = () => {
  return (
    <div className = 'yearly-schedules'>
        <input type = 'text' className = 'plan-name'></input>
        <textarea className = 'plan-context'></textarea>
        <button type = 'submit'>저장</button>
    </div>
  )
}

export default Yearly;