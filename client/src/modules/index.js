import { combineReducers } from 'redux';
import postGoals from './PostGoals';
import postSchedules from './PostDailySchedules';
import getGoals from './GetGoals';
import getSchedules from './GetDailySchedules';
import setDateReducer from './setDate';
import setPlansReducer from './setPlans';
import setScheduleTimeReducer from './setTime';

export default combineReducers({
  postGoals,
  postSchedules,
  getGoals,
  getSchedules,
  setDateReducer,
  setPlansReducer,
  setScheduleTimeReducer
})