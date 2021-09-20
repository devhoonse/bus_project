import React from 'react';
import { connect, useDispatch } from 'react-redux';

import Setting from "../components/Setting";
import useActions from "../lib/useActions";
import {getSetting, postSetting, changeInputBus, changeInputSubwayStation, changeInputBusStation} from "../redux/setting";


const { useEffect } = React;


const SettingContainerSkeleton = ({ setting, loadingSetting, postingSetting, getSetting, postSetting }) => {

  const dispatch = useDispatch();

  const [onChangeInputBus, onChangeInputSubwayStation, onChangeInputBusStation] = useActions(
    [changeInputBus, changeInputSubwayStation, changeInputBusStation, ],
    []
  );

  const onPostSetting = async setting => {
    try {
      await postSetting({
        bus_id: setting.data.bus_id,
        bus_station_id: setting.data.bus_station_id,
        subway_station_id: setting.data.subway_station_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fn = async () => {
      try {
        await getSetting({ user_id: 'devhoonse' });
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [getSetting]);

  return (
    <Setting setting={setting}
             loadingSetting={loadingSetting}
             postingSetting={postingSetting}
             onPostSetting={onPostSetting}
             onChangeInputBus={onChangeInputBus}
             onChangeInputBusStation={onChangeInputBusStation}
             onChangeInputSubwayStation={onChangeInputSubwayStation}
    />
  );
};


const makeContainer = connect(
  ({ setting, loading }) => ({
    setting: setting,
    loadingSetting: loading['setting/GET_SETTING'],
    postingSetting: loading['setting/POST_SETTING'],
  }),
  {
    getSetting,
    postSetting,
  }
);
const SettingContainer = makeContainer(SettingContainerSkeleton);

export default SettingContainer;