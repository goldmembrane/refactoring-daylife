import { handleActions } from 'redux-actions';

import axios from 'axios';

const POST_GOAL_PENDING = 'POST_GOAL_PENDING';
const POST_GOAL_SUCCESS = 'POST_GOAL_SUCCESS';
const POST_GOAL_FAILURE = 'POST_GOAL_FAILURE';

axios.defaults.withCredentials = true;

function postGoalAPI(data) {
  return axios.post('http://localhost:3001/plans/goals/post', data);
}

const initialState = {
  pending: false,
  error: false,
  data: null
}

export const PostGoals = data => dispatch => {
  dispatch({ type: POST_GOAL_PENDING });

  return postGoalAPI(data)
    .then(result => {
      dispatch({
        type: POST_GOAL_SUCCESS,
        payload: result.data
      });
    }).catch(error => {
      dispatch({
        type: POST_GOAL_FAILURE,
        payload: error
      });
    });
}



export default handleActions(
  {
    [POST_GOAL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [POST_GOAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload
      };
    },
    [POST_GOAL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
)