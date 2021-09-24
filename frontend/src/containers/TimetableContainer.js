import React from 'react';
import { connect } from 'react-redux';

import Timetable from "../components/Timetable";
import timetable, {getTimetable} from "../redux/timetable";
import {getSetting} from "../redux/setting";
import SettingContainer from "./SettingContainer";


const { useEffect } = React;


const TimetableContainerSkeleton = ({ timetable, setting, loadingTimetable, loadingSetting, getSetting, getTimetable }) => {

  const { bus_station_id, bus_id, subway_station_id } = setting.data;

  useEffect(() => {
    const fn = async () => {
      try {
        await getSetting({user_id: 'devhoonse',});
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      try {
        await getTimetable({
          bus_station_id,
          bus_id,
          subway_station_id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [bus_station_id, bus_id, subway_station_id]);

  return (
    <>
      <SettingContainer marginY={"2rem"} readOnly={true} />
      <Timetable timetable={timetable}
                 loadingSetting={loadingSetting}
                 loadingTimetable={loadingTimetable}
      />
    </>
  );
};


const makeContainer = connect(
  context => {
    const { timetable, setting, loading } = context;
    return {
      setting: setting,
      timetable: timetable,
      loadingSetting: loading['setting/GET_SETTING'],
      loadingTimetable: loading['timetable/GET_TIMETABLE'],
    };
  },
  {
    getSetting,
    getTimetable,
  }
);
const TimetableContainer = makeContainer(TimetableContainerSkeleton);

export default TimetableContainer;