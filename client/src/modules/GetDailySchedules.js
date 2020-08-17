import { handleActions } from "redux-actions";
import axios from "axios";

const GET_SCHEDULES_PENDING = "GET_SCHEDULES_PENDING";
const GET_SCHEDULES_SUCCESS = "GET_SCHEDULES_SUCCESS";
const GET_SCHEDULES_FAILURE = "GET_SCHEDULES_FAILURE";

axios.defaults.withCredentials = true;

function getScheduleAPI() {
  return axios({
    method: "get",
    url: "http://localhost:3001/plans/schedules/get",
    responseType: "json",
  });
}

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export const getSchedules = () => (dispatch) => {
  dispatch({ type: GET_SCHEDULES_PENDING });

  return getScheduleAPI()
    .then((result) => {
      dispatch({
        type: GET_SCHEDULES_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_SCHEDULES_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [GET_SCHEDULES_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_SCHEDULES_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [GET_SCHEDULES_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
