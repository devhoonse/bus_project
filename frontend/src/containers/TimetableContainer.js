import React from 'react';
import { connect } from 'react-redux';

import Timetable from "../components/Timetable";
import {getTimetable} from "../redux/timetable";


const { useEffect } = React;


const TimetableContainerSkeleton = ({ timetable, loadingTimetable, getTimetable }) => {

  useEffect(() => {
    const fn = async () => {
      try {
        await getTimetable({ station_id: 'station_id_hardcoded', bus_id: 'bus_id_hardcoded'});
      } catch (error) {
        console.log(error);
      }
    };
    fn();

  }, [getTimetable]);

  return (
    <Timetable timetable={timetable}
               loadingTimetable={loadingTimetable}
    />
  );
};


const makeContainer = connect(
  ({ timetable, loading }) => ({
    timetable: timetable.timetable,
    loadingTimetable: loading['timetable/GET_TIMETABLE'],
  }),
  {
    getTimetable,
  }
);
const TimetableContainer = makeContainer(TimetableContainerSkeleton);

export default TimetableContainer;