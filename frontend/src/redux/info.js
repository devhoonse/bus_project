import { handleActions, createAction } from 'redux-actions';
import { produce } from 'immer';

import * as api from '../lib/api/info';
import createRequestThunk from '../lib/createRequestThunk';


const GET_SUBWAYSTNS = 'info/GET_SUBWAYSTNS';
const GET_SUBWAYSTNS_SUCCESS = 'info/GET_SUBWAYSTNS_SUCCESS';
const GET_SUBWAYSTNS_FAILURE = 'info/GET_SUBWAYSTNS_FAILURE';

const GET_BUSSTNS = 'info/GET_BUSSTNS';
const GET_BUSSTNS_SUCCESS = 'info/GET_BUSSTNS_SUCCESS';
const GET_BUSSTNS_FAILURE = 'info/GET_BUSSTNS_FAILURE';


export const getAvailableSubwayStations = createRequestThunk(GET_SUBWAYSTNS, api.getAvailableSubwayStations);
export const getAvailableBusStations = createRequestThunk(GET_BUSSTNS, api.getAvailableBusStations);


const initialState = {
  availableSubwayStations: {
      success: null,
      params: {},
      timestamp: null,
      data: {
        list: [],
      },
  },
  availableBusStations: {
    success: null,
    params: {},
    timestamp: null,
    data: {
      list: [],
    },
  },
}


const info = handleActions(
  {
    [GET_SUBWAYSTNS_SUCCESS]: (state, {payload: input}) => produce(
      state,
      draft => {
        draft.availableSubwayStations = input;
      }
    ),
    [GET_BUSSTNS_SUCCESS]: (state, {payload: input}) => produce(
      state,
      draft => {
        draft.availableBusStations = input;
      }
    ),
  },
  initialState
);


export default info;