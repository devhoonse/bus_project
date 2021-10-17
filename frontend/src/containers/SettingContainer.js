import React from 'react';
import { connect, useDispatch } from 'react-redux';

import Setting from "../components/Setting";
import useActions from "../lib/useActions";
import {getSetting, postSetting, changeInputBus, changeInputSubwayStation, changeInputBusStation} from "../redux/setting";
import {getAvailableSubwayStations, getAvailableBusStations} from "../redux/info";


const { useEffect } = React;


export const SettingContainerSkeleton = ({
  setting,
  availableSubwayStations,
  availableBusStations,
  loadingSetting,
  loadingAvailableSubwayStations,
  loadingAvailableBusStations,
  postingSetting,
  getSetting,
  getAvailableSubwayStations,
  getAvailableBusStations,
  postSetting,
  marginY,
  readOnly
}) => {

  const [onChangeInputBus, onChangeInputSubwayStation, onChangeInputBusStation] = useActions(
    [changeInputBus, changeInputSubwayStation, changeInputBusStation, ],
    []
  );

  const onPostSetting = async setting => {
    try {
      const subway_station_nm = availableSubwayStations.data.list.filter(
        subwayStation => subwayStation.value === setting.data.subway_station_id
      )[0]['label'];
      const bus_station_nm = availableBusStations.data.list.filter(
        busStation => busStation.value === setting.data.bus_station_id
      )[0]['label'];
      await postSetting({
        bus_id: setting.data.bus_id,
        bus_nm: '023',  // todo: 하드코딩 제거
        bus_station_id: setting.data.bus_station_id,
        bus_station_nm,
        subway_station_id: setting.data.subway_station_id,
        subway_station_nm,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fn = async () => {
      try {
        let locationInfo = {};
        navigator.geolocation.getCurrentPosition(function(position) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;

          locationInfo = {latitude: lat, longitude: long};
        });
        console.log(locationInfo);
        await getSetting({ user_id: 'devhoonse' });
        await getAvailableSubwayStations(locationInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [getSetting]);

  useEffect(() => {
    const fn = async () => {
      try {
        await getAvailableBusStations({
          bus_id: setting.data.bus_id,
          subway_station_id: setting.data.subway_station_id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [setting]);

  return (
    <Setting setting={setting}
             availableSubwayStations={availableSubwayStations}
             availableBusStations={availableBusStations}
             loadingSetting={loadingSetting}
             loadingAvailableSubwayStations={loadingAvailableSubwayStations}
             loadingAvailableBusStations={loadingAvailableBusStations}
             postingSetting={postingSetting}
             onPostSetting={onPostSetting}
             onChangeInputBus={onChangeInputBus}
             onChangeInputBusStation={onChangeInputBusStation}
             onChangeInputSubwayStation={onChangeInputSubwayStation}
             marginY={marginY}
             readOnly={readOnly}
    />
  );
};


const makeContainer = connect(
  ({ setting, info, loading }) => ({
    setting: setting,
    availableSubwayStations: info.availableSubwayStations,
    availableBusStations: info.availableBusStations,
    loadingSetting: loading['setting/GET_SETTING'],
    postingSetting: loading['setting/POST_SETTING'],
    loadingAvailableSubwayStations: loading['info/GET_SUBWAYSTNS'],
    loadingAvailableBusStations: loading['info/GET_BUSSTNS'],
  }),
  {
    getSetting,
    postSetting,
    getAvailableSubwayStations,
    getAvailableBusStations,
  }
);
const SettingContainer = makeContainer(SettingContainerSkeleton);

export default SettingContainer;