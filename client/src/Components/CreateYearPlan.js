import React from 'react';


const CreateYearPlan = ({ close, select, onCreate }) => {


  return (
    select === 'yearly' ? (
      <div>
        <button className = 'save' onClick = {() => {onCreate(); close()}}>저장</button>
      </div>
    ) : null
  )
}


export default CreateYearPlan;