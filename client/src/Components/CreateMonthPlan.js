import React from 'react';

const CreateMonthPlan = ({ close, select, onCreate }) => {
  
  return (
    select === 'monthly' ? (
      <div>
        <button className = 'save' onClick = {() => {onCreate(); close()}}>저장</button>
      </div>
    ): null
  )
}


export default CreateMonthPlan;