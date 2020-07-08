import React from 'react';

const CreateWeekPlan = ({ close, select, onCreate }) => {


  return (
    select === 'weekly' ? (
      <div>
        <button className = 'save' onClick = {() =>{onCreate(); close()}}>저장</button>
      </div>
    ): null
  )
}


export default CreateWeekPlan;