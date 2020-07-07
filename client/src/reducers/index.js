import { combineReducers } from 'redux';
import setDateReducer from './setDate';
import setPlansReducer from './setPlans';
import setScheduleTimeReducer from './setTime';

export default combineReducers({
  setDateReducer,
  setPlansReducer,
  setScheduleTimeReducer
});