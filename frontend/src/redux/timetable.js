import { handleActions } from 'redux-actions';
import produce from "immer";

import * as api from '../lib/api/timetable';
import createRequestThunk from '../lib/createRequestThunk';


const GET_TIMETABLE = 'timetable/GET_TIMETABLE';
const GET_TIMETABLE_SUCCESS = 'timetable/GET_TIMETABLE_SUCCESS';
const GET_TIMETABLE_FAILURE = 'timetable/GET_TIMETABLE_FAILURE';


export const getTimetable = createRequestThunk(GET_TIMETABLE, api.getTimetable);


const initialState = {
  success: null,
  params: {},
  timestamp: null,
  timetable: {},
};

const timetable = handleActions(
  {
    [GET_TIMETABLE_SUCCESS]: (state, {payload: input}) => produce(
      state,
      draft => {
        draft.success = input.success;
        draft.timestamp = input.timestamp;
        draft.params.bus_station_id = input.params.bus_station_id;
        draft.params.bus_id = input.params.bus_id;
        draft.params.subway_station_id = input.params.subway_station_id;
        draft.timetable = input.timetable;
      }
    ),
  },
  initialState
);


export default timetable;