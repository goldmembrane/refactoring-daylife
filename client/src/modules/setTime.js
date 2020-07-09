import { SET_SCHEDULE_START_TIME, SET_SCHEDULE_END_TIME } from '../actions/index';

const initialState = {
  start: new Date(),
  end: new Date()
}

const setScheduleTimeReducer = (state = initialState, action) => {
  
  switch(action.type) {
    case SET_SCHEDULE_START_TIME:
      return Object.assign({}, state, {
        start: action.start
      });

    case SET_SCHEDULE_END_TIME:
      return Object.assign({}, state, {
        end: action.end
      });

    default:
      return state;
  }
};

export default setScheduleTimeReducer;