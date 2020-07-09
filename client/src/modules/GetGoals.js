import { handleActions } from "redux-actions";

import axios from "axios";

const GET_GOAL_PENDING = "GET_GOAL_PENDING";
const GET_GOAL_SUCCESS = "GET_GOAL_SUCCESS";
const GET_GOAL_FAILURE = "GET_GOAL_FAILURE";

function getGoalAPI() {
  return axios.get("http://localhost:3001/goals/get");
}

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export const getGoal = () => (dispatch) => {
  dispatch({ type: GET_GOAL_PENDING });

  return getGoalAPI()
    .then((result) => {
      dispatch({
        type: GET_GOAL_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_GOAL_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [GET_GOAL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_GOAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [GET_GOAL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
