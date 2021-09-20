import { handleActions } from 'redux-actions';

import * as api from '../lib/api/arrival';
import createRequestThunk from '../lib/createRequestThunk';


const GET_ARRIVAL = 'home/GET_ARRIVAL';
const GET_ARRIVAL_SUCCESS = 'home/GET_ARRIVAL_SUCCESS';
const GET_ARRIVAL_FAILURE = 'home/GET_ARRIVAL_FAILURE';


export const getArrival = createRequestThunk(GET_ARRIVAL, api.getArrival);


const initialState = {};


const home = handleActions(
  {
    [GET_ARRIVAL_SUCCESS]: (state, action) => ({
      ...state,
      arrival: action.payload,
    }),
  },
  initialState
);


export default home;