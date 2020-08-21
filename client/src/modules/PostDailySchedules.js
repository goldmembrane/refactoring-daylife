import { handleActions } from "redux-actions";

import axios from "axios";

const POST_SCHEDULES_PENDING = "POST_SCHEDULES_PENDING";
const POST_SCHEDULES_SUCCESS = "POST_SCHEDULES_SUCCESS";
const POST_SCHEDULES_FAILURE = "POST_SCHEDULES_FAILURE";

axios.defaults.withCredentials = true;

function PostSchedulesAPI(data) {
  return axios({
    method: "post",
    url: "http://localhost:3001/plans/schedules/post",
    headers: { "content-type": "application/json" },
    data: JSON.stringify(data),
  });
}

const initialState = {
  pending: false,
  error: false,
  data: null,
};

export const postSchedules = (data) => (dispatch) => {
  dispatch({ type: POST_SCHEDULES_PENDING });

  return PostSchedulesAPI(data)
    .then((result) => {
      dispatch({
        type: POST_SCHEDULES_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: POST_SCHEDULES_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [POST_SCHEDULES_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [POST_SCHEDULES_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [POST_SCHEDULES_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
