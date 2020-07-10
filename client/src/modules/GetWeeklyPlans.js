import { handleActions } from 'redux-actions';

import axios from 'axios';

const GET_WEEK_GOAL_PENDING = 'GET_WEEK_GOAL_PENDING';
const GET_WEEK_GOAL_SUCCESS = 'GET_WEEK_GOAL_SUCCESS';
const GET_WEEK_GOAL_FAILURE = 'GET_WEEK_GOAL_FAILURE';

axios.defaults.withCredentials = true;



function getWeeklyGoalAPI() {
  return axios({
    method: 'get',
    url: 'http://15.164.232.40:3001/plans/goals/get',
    params: {
      category: 'weekly',
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


export const getWeeklyGoals = () => dispatch => {
  dispatch({ type: GET_WEEK_GOAL_PENDING });

  return getWeeklyGoalAPI()
    .then(result => {
      dispatch({
        type: GET_WEEK_GOAL_SUCCESS,
        payload: result.data
      });
    }).catch(error => {
      dispatch({
        type: GET_WEEK_GOAL_FAILURE,
        payload: error
      });
    });
}

export default handleActions(
  {
    [GET_WEEK_GOAL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_WEEK_GOAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        week: action.payload
      };
    },
    [GET_WEEK_GOAL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
)