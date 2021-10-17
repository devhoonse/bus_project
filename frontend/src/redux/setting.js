import { handleActions, createAction } from 'redux-actions';
import { produce } from 'immer';

import * as api from '../lib/api/setting';
import createRequestThunk from '../lib/createRequestThunk';


const GET_SETTING = 'setting/GET_SETTING';
const GET_SETTING_SUCCESS = 'setting/GET_SETTING_SUCCESS';
const GET_SETTING_FAILURE = 'setting/GET_SETTING_FAILURE';

const POST_SETTING = 'setting/POST_SETTING';
const POST_SETTING_SUCCESS = 'setting/POST_SETTING_SUCCESS';
const POST_SETTING_FAILURE = 'setting/POST_SETTING_FAILURE';

const CHANGE_INPUT_BUS = 'setting/CHANGE_INPUT_BUS';
const CHANGE_INPUT_SUBWAY_STATION = 'setting/CHANGE_INPUT_SUBWAY_STATION';
const CHANGE_INPUT_BUS_STATION = 'setting/CHANGE_INPUT_BUS_STATION';


export const getSetting = createRequestThunk(GET_SETTING, api.getSetting);
export const postSetting = createRequestThunk(POST_SETTING, api.postSetting);
export const changeInputBus = createAction(
  CHANGE_INPUT_BUS,
    input => input.target.value
);
export const changeInputSubwayStation = createAction(
  CHANGE_INPUT_SUBWAY_STATION,
    input => input.target.value
);
export const changeInputBusStation = createAction(
  CHANGE_INPUT_BUS_STATION,
    input => input.target.value
);


const initialState = {
  success: null,
  params: {},
  timestamp: null,
  data: {
    bus_station_id: null,
    bus_id: null,
    subway_station_id: null,
  },
};


const setting = handleActions(
  {
    [GET_SETTING_SUCCESS]: (state, {payload: input}) => produce(
      state,
      draft => {
        draft.success = input.success;
        draft.timestamp = input.timestamp;
        draft.params.user_id = input.params.user_id;
        draft.data = input.data;
        // draft.data.bus_id = input.data.bus_id;
        // draft.data.bus_station_id = input.data.bus_station_id;
        // draft.data.subway_station_id = input.data.subway_station_id;
      }
    ),
    [POST_SETTING_SUCCESS]: (state, {payload: input} ) => {
      // alert('설정 값이 성공적으로 저장되었습니다.');
      return produce(
        state,
        draft => {
          draft.success = input.success;
          draft.timestamp = input.timestamp;
          draft.params.bus_id = input.params.bus_id;
          draft.params.bus_station_id = input.params.bus_station_id;
          draft.params.subway_station_id = input.params.subway_station_id;
          draft.data = input.data;
          // draft.data.bus_id = input.data.bus_id;
          // draft.data.bus_station_id = input.data.bus_station_id;
          // draft.data.subway_station_id = input.data.subway_station_id;
        }
      );
    },
    [CHANGE_INPUT_BUS]: (state, { payload: input }) => produce(
      state,
      draft => {
        draft.data.bus_id = input;
      }
    ),
    [CHANGE_INPUT_SUBWAY_STATION]: (state, { payload: input }) => produce(
      state,
      draft => {
        draft.data.subway_station_id = input;
      }
    ),
    [CHANGE_INPUT_BUS_STATION]: (state, { payload: input }) => produce(
      state,
      draft => {
        draft.data.bus_station_id = input;
      }
    ),
  },
  initialState
);


export default setting;