import { SET_YEAR_PLAN_VALUE,
         SET_MONTH_PLAN_VALUE,
         SET_WEEK_PLAN_VALUE,
         SET_DAY_PLAN_VALUE } from '../actions/index';


const initialState = {
  year: '',
  month: '',
  week: '',
  day: ''
}

const setPlansReducer = (state = initialState, action ) => {
  
  switch(action.type) {
    case SET_YEAR_PLAN_VALUE:
      return Object.assign({}, state, {
        year: action.year
      });
    
    case SET_MONTH_PLAN_VALUE:
      return Object.assign({}, state, {
        month: action.month
      });

    case SET_WEEK_PLAN_VALUE:
      return Object.assign({}, state, {
        week: action.week
      });

    case SET_DAY_PLAN_VALUE:
      return Object.assign({}, state, {
        day: action.day
      });
    
    default:
      return state;
  }
};

export default setPlansReducer;