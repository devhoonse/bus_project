import React from 'react';
import { connect, useSelector } from 'react-redux';

import Home from '../components/Home';
import { getArrival } from '../redux/home';
import { getSetting } from "../redux/setting";
import SettingContainer from "./SettingContainer";


const { useEffect } = React;


const HomeContainerSkeleton = ({ arrival, setting, loadingArrival, loadingSetting, getSetting, getArrival }) => {

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
        await getArrival({
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
      <Home arrival={arrival}
            loadingSetting={loadingSetting}
            loadingArrival={loadingArrival}
      />
    </>
  );
};


const makeContainer = connect(
  context => {
    const { home, setting, loading } = context;
    return {
      setting: setting,
      arrival: home,
      loadingSetting: loading['setting/GET_SETTING'],
      loadingArrival: loading['home/GET_ARRIVAL'],
    };
  },
  {
    getSetting,
    getArrival,
  }
);
const HomeContainer = makeContainer(HomeContainerSkeleton);

export default HomeContainer;