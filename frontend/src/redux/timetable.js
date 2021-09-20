import { handleActions } from 'redux-actions';

import * as api from '../lib/api/timetable';
import createRequestThunk from '../lib/createRequestThunk';


const GET_TIMETABLE = 'timetable/GET_TIMETABLE';
const GET_TIMETABLE_SUCCESS = 'timetable/GET_TIMETABLE_SUCCESS';
const GET_TIMETABLE_FAILURE = 'timetable/GET_TIMETABLE_FAILURE';


export const getTimetable = createRequestThunk(GET_TIMETABLE, api.getTimetable);


const initialState = {
  success: null,
  params: null,
  timestamp: null,
  timetable: null,
};

const timetable = handleActions(
  {
    [GET_TIMETABLE_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  initialState
);


export default timetable;