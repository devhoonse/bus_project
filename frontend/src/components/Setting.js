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
      
      input {
        background: none;
        outline: none;
        border: none;
        padding: 0.5rem;
        font-size: 1rem;
        line-height: 1.5; 
        flex: 1;
        
        &::placeholder {
          color: #dee2e6;
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
        font-size: 1.5rem;
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
   loadingSetting, postingSetting, setting, onPostSetting, onChangeInputBus, onChangeInputSubwayStation, onChangeInputBusStation, marginY, readOnly
}) => {
  return (
    <SettingBlock marginY={marginY}>
      <section>
        {/*<h1>설정 화면</h1>*/}
        {(loadingSetting || postingSetting) && '로딩 중 ...'}
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
            <input name={"subway_station_id"}
                   list={"subway_station_ids"}
                   placeholder={"지하철역 ID"}
                   onChange={onChangeInputSubwayStation}
                   value={setting.data.subway_station_id}
                   readOnly={readOnly}
            />
            <datalist id={"subway_station_ids"}>
              <option value={"행신역"}>행신역</option>
              <option value={"화정역"}>화정역</option>
            </datalist>
          </div>

          <div className={"input-container"}>
            <label htmlFor={"bus_id"}>
              <img src={label_bus} />
            </label>
            <input name={"bus_id"}
                   placeholder={"버스 ID"}
                   onChange={onChangeInputBus}
                   value={setting.data.bus_id}
                   readOnly={true}
            />
          </div>

          <div className={"input-container"}>
            <label htmlFor={"bus_station_id"}>
              <img src={label_bus_station} />
            </label>
            <input name={"bus_station_id"}
                   placeholder={"버스 정류장 ID"}
                   onChange={onChangeInputBusStation}
                   value={setting.data.bus_station_id}
                   readOnly={readOnly}
            />
          </div>

          <div className={"button-container"} style={{ display: readOnly ? "none" : "flex", }}>
            <button type={"submit"}>저장</button>
          </div>
        </form>
      </section>
    </SettingBlock>
  );
};

export default Setting;