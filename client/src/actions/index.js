export const SET_DATE_VALUE = 'SET_DATE_VALUE';
export const SET_YEAR_PLAN_VALUE = 'SET_YEAR_PLAN_VALUE';
export const SET_MONTH_PLAN_VALUE = 'SET_MONTH_PLAN_VALUE';
export const SET_WEEK_PLAN_VALUE = 'SET_WEEK_PLAN_VALUE';
export const SET_DAY_PLAN_VALUE = 'SET_DAY_PLAN_VALUE';
export const SET_SCHEDULE_START_TIME = 'SET_SCHEDULE_START_TIME';
export const SET_SCHEDULE_END_TIME = 'SET_SCHEDULE_END_TIME';

export const setDate = date => ({
  type: SET_DATE_VALUE,
  date
});

export const setYearPlan = year => ({
  type: SET_YEAR_PLAN_VALUE,
  year
});

export const setMonthPlan = month => ({
  type: SET_MONTH_PLAN_VALUE,
  month
});

export const setWeekPlan = week => ({
  type: SET_WEEK_PLAN_VALUE,
  week
});

export const setDayPlan = day => ({
  type: SET_DAY_PLAN_VALUE,
  day
});

export const setStartTime = start => ({
  type: SET_SCHEDULE_START_TIME,
  start
});

export const setEndTime = end => ({
  type: SET_SCHEDULE_END_TIME,
  end
});