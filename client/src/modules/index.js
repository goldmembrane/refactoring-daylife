import { combineReducers } from 'redux';
import postGoals from './PostGoals';
import postSchedules from './PostDailySchedules';
import getYearGoals from './GetYearGoals';
import getMonthGoals from './GetMonthGoals';
import getWeeklyGoals from './GetWeeklyPlans';
import getSchedules from './GetDailySchedules';
import setThisDate from './setThisDate';
import setDateReducer from './setDate';
import setPlansReducer from './setPlans';
import setScheduleTimeReducer from './setTime';

export default combineReducers({
  postGoals,
  postSchedules,
  getYearGoals,
  getMonthGoals,
  getWeeklyGoals,
  getSchedules,
  setThisDate,
  setDateReducer,
  setPlansReducer,
  setScheduleTimeReducer
})