import React from 'react';
import { connect, useDispatch } from 'react-redux';

import Setting from "../components/Setting";
import useActions from "../lib/useActions";
import {getSetting, postSetting, changeInputBus, changeInputSubwayStation, changeInputBusStation} from "../redux/setting";
import {SettingContainerSkeleton} from "./SettingContainer";


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
const SettingViewerContainer = makeContainer(SettingContainerSkeleton);

export default SettingViewerContainer;