import { combineReducers } from 'redux';

import loading from './loading';
import home from "./home";
import setting from "./setting";
import timetable from "./timetable";
import info from './info';


const rootReducer = combineReducers({
  loading,
  home,
  setting,
  timetable,
  info,
});


export default rootReducer;