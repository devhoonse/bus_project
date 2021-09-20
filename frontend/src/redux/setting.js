import { handleActions } from 'redux-actions';

import * as api from '../lib/api/setting';
import createRequestThunk from '../lib/createRequestThunk';


const GET_SETTING = 'setting/GET_SETTING';
const GET_SETTING_SUCCESS = 'setting/GET_SETTING_SUCCESS';
const GET_SETTING_FAILURE = 'setting/GET_SETTING_FAILURE';

const POST_SETTING = 'setting/POST_SETTING';
const POST_SETTING_SUCCESS = 'setting/POST_SETTING_SUCCESS';
const POST_SETTING_FAILURE = 'setting/POST_SETTING_FAILURE';


export const getSetting = createRequestThunk(GET_SETTING, api.getSetting);
export const postSetting = createRequestThunk(POST_SETTING, api.postSetting)


const initialState = {};


const setting = handleActions(
  {
    [GET_SETTING_SUCCESS]: (state, action) => ({
      ...state,
      setting: action.payload,
    }),
    [POST_SETTING_SUCCESS]: (state, action) => ({
      ...state,
      setting: action.payload,
    }),
  },
  initialState
);


export default setting;