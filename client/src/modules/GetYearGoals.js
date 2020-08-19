import { handleActions } from "redux-actions";

import axios from "axios";

const GET_YEAR_GOAL_PENDING = "GET_YEAR_GOAL_PENDING";
const GET_YEAR_GOAL_SUCCESS = "GET_YEAR_GOAL_SUCCESS";
const GET_YEAR_GOAL_FAILURE = "GET_YEAR_GOAL_FAILURE";

axios.defaults.withCredentials = true;

function getYearGoalAPI() {
  return axios({
    method: "get",
    url: "http://54.180.87.72:3001/plans/goals/get",
    params: {
      category: "annually",
      year: "2020",
    },
    responseType: "json",
  });
}

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export const getYearGoals = () => (dispatch) => {
  dispatch({ type: GET_YEAR_GOAL_PENDING });

  return getYearGoalAPI()
    .then((result) => {
      dispatch({
        type: GET_YEAR_GOAL_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_YEAR_GOAL_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [GET_YEAR_GOAL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_YEAR_GOAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        year: action.payload,
      };
    },
    [GET_YEAR_GOAL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
