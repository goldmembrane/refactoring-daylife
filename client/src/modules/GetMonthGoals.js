import { handleActions } from 'redux-actions';

import axios from 'axios';

const GET_MONTH_GOAL_PENDING = 'GET_MONTH_GOAL_PENDING';
const GET_MONTH_GOAL_SUCCESS = 'GET_MONTH_GOAL_SUCCESS';
const GET_MONTH_GOAL_FAILURE = 'GET_MONTH_GOAL_FAILURE';

axios.defaults.withCredentials = true;



function getMonthGoalAPI() {
  return axios({
    method: 'get',
    url: 'http://15.164.232.40:3001/plans/goals/get',
    params: {
      category: 'monthly',
      year: '2020',
      day: '7'
    },
    responseType: 'json'
  });
}

const initialState = {
  pending: false,
  error: false,
  data: []
};


export const getMonthGoals = () => dispatch => {
  dispatch({ type: GET_MONTH_GOAL_PENDING });

  return getMonthGoalAPI()
    .then(result => {
      dispatch({
        type: GET_MONTH_GOAL_SUCCESS,
        payload: result.data
      });
    }).catch(error => {
      dispatch({
        type: GET_MONTH_GOAL_FAILURE,
        payload: error
      });
    });
}

export default handleActions(
  {
    [GET_MONTH_GOAL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_MONTH_GOAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        month: action.payload
      };
    },
    [GET_MONTH_GOAL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
)