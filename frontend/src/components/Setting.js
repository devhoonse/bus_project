import React from 'react';
import styled from "styled-components";
import DropDown from "react-dropdown";

import label_bus from "../media/img/bus_route.png";
import label_bus_station from "../media/img/bus_station.png";
import label_subway_station from "../media/img/subway_station.png";


const SettingBlock = styled.div`
  form {
    margin-top: ${props => props.marginY || '5rem'};
    
    div.input-container {
      display: flex;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 5px;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      // background: #ccc;
      
      label {
        img {
          height: 3rem;
        }
      }
      
      input, select {
        background: none;
        outline: none;
        border: none;
        padding: 0.5rem;
        font-size: 1rem;
        font-family: Goyang;
        line-height: 1.5; 
        width: 100%;
        // flex: 1;
        
        &:disabled {
          -moz-appearance: none;
          -webkit-appearance: none;
        }
        
        &::placeholder {
          color: #dee2e6;
        }
      }
      
      div.description {
        position: absolute;
        right: 1rem;
        outline: none;
        border: none;
        width: 3rem;
        font-size: 0.75rem;
        
        span {
          line-height: 3rem;
          vertical-align: middle;
          color: #ccc;
        }
      }
      
      & + & {
        margin-top: 5rem;
      }
    }
    
    div.button-container {
      display: flex;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      margin-top: ${props => props.marginY || '5rem'};
      border-radius: 5px;
      overflow: hidden;
      
      button {
        width: 100%;
        background: none;
        outline: none;
        border: none;
        background: #868e96;
        color: white;
        // padding-left: 1rem;
        // padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 2rem;
        font-family: Goyang;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s background ease-in;
        
        &:hover {
          background: #adb5bd;
        }
      }
    }
  }
`;


const Setting = ({
   loadingSetting,
   loadingAvailableSubwayStations,
   loadingAvailableBusStations,
   postingSetting,
   setting,
   availableSubwayStations,
   availableBusStations,
   onPostSetting,
   onChangeInputBus,
   onChangeInputSubwayStation,
   onChangeInputBusStation,
   marginY,
   readOnly
}) => {
  return (
    <SettingBlock marginY={marginY}>
      <section>
        {/*<h1>설정 화면</h1>*/}
        {/*{(loadingSetting || postingSetting || loadingAvailableSubwayStations) && '로딩 중 ...'}*/}
        {/*<p>*/}
        {/*  {!(loadingSetting || postingSetting) && setting && (*/}
        {/*    JSON.stringify(setting, null, 2)*/}
        {/*  )}*/}
        {/*</p>*/}
        <form onSubmit={event => {event.preventDefault();if (!readOnly) onPostSetting(setting);}}>
          <div className={"input-container"}>
            <label htmlFor={"subway_station_id"}>
              <img src={label_subway_station} />
            </label>
            <select name={"subway_station_id"}
                    placeholder={"지하철역 ID"}
                    onChange={onChangeInputSubwayStation}
                    value={setting.data.subway_station_id}
                    disabled={readOnly}
            >
              {
                !loadingAvailableSubwayStations && availableSubwayStations.data.list && (
                  availableSubwayStations.data.list.map(
                    stationInfo => (
                      <option key={stationInfo.value} value={stationInfo.value}>
                        {stationInfo.label}
                      </option>
                    )
                  )
                )
              }
            </select>
            <div className={"description"}>
              <span>{ "(도착)" }</span>
            </div>
          </div>

          <div className={"input-container"}>
            <label htmlFor={"bus_id"}>
              <img src={label_bus} />
            </label>
            <select name={"bus_id"}
                    placeholder={"버스 ID"}
                    onChange={onChangeInputBus}
                    value={setting.data.bus_id}
                    disabled={true}
            >
              <option key={"241312015"} value={"241312015"}>
                023
              </option>
            </select>
          </div>

          <div className={"input-container"}>
            <label htmlFor={"bus_station_id"}>
              <img src={label_bus_station} />
            </label>
            <select name={"bus_station_id"}
                    placeholder={"버스 정류장 ID"}
                    onChange={onChangeInputBusStation}
                    value={setting.data.bus_station_id}
                    disabled={readOnly}
            >
              {
                !loadingAvailableBusStations && availableBusStations.data.list && (
                  availableBusStations.data.list.map(
                    stationInfo => (
                      <option key={stationInfo.value} value={stationInfo.value}>
                        {stationInfo.label}
                      </option>
                    )
                  )
                )
              }
            </select>
            {/*<input name={"bus_station_id"}*/}
            {/*       placeholder={"버스 정류장 ID"}*/}
            {/*       onChange={onChangeInputBusStation}*/}
            {/*       value={setting.data.bus_station_id}*/}
            {/*       readOnly={readOnly}*/}
            {/*/>*/}
            <div className={"description"}>
              <span>{ "(출발)" }</span>
            </div>
          </div>

          <div className={"button-container"} style={{ display: readOnly ? "none" : "flex", }}>
            <button type={"submit"}>
                {
                  (loadingSetting || loadingAvailableSubwayStations) && '로딩 중 ...'
                }
                {
                  postingSetting && '저장 중...'
                }
                {
                  !(loadingSetting || loadingAvailableSubwayStations || postingSetting) && '저장'
                }
            </button>
          </div>
        </form>
      </section>
    </SettingBlock>
  );
};

export default Setting;