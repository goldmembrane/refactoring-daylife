import { createAction, handleActions, handleAction } from 'redux-actions';

const CHANGE_INPUT = 'WritePlan/CHANGE_INPUT';
const CREATE = 'WritePlan/CREATE';

export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++}));

const initialState = {
  input: '',
  list: []
}

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        plan: action.payload.text
      })
    })
  },
  initialState
)