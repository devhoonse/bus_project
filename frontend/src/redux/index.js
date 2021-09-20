import { combineReducers } from 'redux';

import loading from './loading';
import home from "./home";
import setting from "./setting";
import timetable from "./timetable";


const rootReducer = combineReducers({
  loading,
  home,
  setting,
  timetable,
});


export default rootReducer;