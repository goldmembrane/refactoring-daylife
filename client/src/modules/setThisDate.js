import { createAction, handleActions } from 'redux-actions';

const CHANGE_DATE = 'CHANGE_DATE';

export const changeDate = createAction(CHANGE_DATE, date => date);

const initialState = {
  date: new Date()
}

export default handleActions(
  {
    [CHANGE_DATE]: (state, action) => ({
      ...state,
      date: action.payload
    })
  }
  ,initialState
)