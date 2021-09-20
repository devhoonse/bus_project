import React from 'react';
import { connect } from 'react-redux';

import Setting from "../components/Setting";
import {getSetting, postSetting} from "../redux/setting";


const { useEffect } = React;


const SettingContainerSkeleton = ({ setting, loadingSetting, getSetting, postSetting }) => {

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
    <Setting setting={setting} loadingSetting={loadingSetting}
    />
  );
};


const makeContainer = connect(
  ({ setting, loading }) => ({
    setting: setting.setting,
    loadingSetting: loading['setting/GET_SETTING'],
  }),
  {
    getSetting,
    postSetting,
  }
);
const SettingContainer = makeContainer(SettingContainerSkeleton);

export default SettingContainer;