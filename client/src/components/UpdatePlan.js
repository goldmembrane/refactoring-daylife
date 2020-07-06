import React from 'react';

const UpdatePlan = () => {
  return (
    <>
      <div className = 'modal-box'>
        <div className = 'modal-title-box'>
          <p className = 'modal-title'>일정 편집</p>
        </div>
        <div className = 'modal-content-box'>
          <div className = 'plan-name-box'>
            <label className = 'plan-name'>일정 이름</label>
            <input type = 'text' className = 'write-plan-name'></input>
          </div>
          <div className = 'plan-category-box'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePlan;