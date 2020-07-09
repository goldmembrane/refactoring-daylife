import { SET_DATE_VALUE } from '../actions/index';

const initialState = {
  date: new Date()
}

const setDateReducer = (state = initialState, action) => {
  
  switch(action.type) {
    case SET_DATE_VALUE:
      return Object.assign({}, state, {
        date: action.date
      });
    default:
      return state;
  }
};

export default setDateReducer;