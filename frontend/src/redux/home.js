import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import * as api from '../lib/api/arrival';
import createRequestThunk from '../lib/createRequestThunk';


const GET_ARRIVAL = 'home/GET_ARRIVAL';
const GET_ARRIVAL_SUCCESS = 'home/GET_ARRIVAL_SUCCESS';
const GET_ARRIVAL_FAILURE = 'home/GET_ARRIVAL_FAILURE';


export const getArrival = createRequestThunk(GET_ARRIVAL, api.getArrival);


const initialState = {
  success: null,
  params: {},
  timestamp: null,
  data: {},
};


const home = handleActions(
  {
    [GET_ARRIVAL_SUCCESS]: (state, {payload: input}) => produce(
      state,
      draft => {
        draft.success = input.success;
        draft.timestamp = input.timestamp;
        draft.params.bus_station_id = input.params.bus_station_id;
        draft.params.bus_id = input.params.bus_id;
        draft.params.subway_station_id = input.params.subway_station_id;
        draft.data = input.data;
      }
    ),
  },
  initialState
);


export default home;