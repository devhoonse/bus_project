import React, {useCallback, useState} from 'react';
import { withRouter } from 'react-router-dom';
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
        flex: 2;
        
        &:disabled {
          -moz-appearance: none;
          -webkit-appearance: none;
        }
        
        &::placeholder {
          color: #dee2e6;
        }
      }
      
      select {
        position: relative;
      }
      
      div.description {
        // position: sticky;
        right: 3rem;
        outline: none;
        border: none;
        padding-left: 1rem;
        width: 3rem;
        font-size: 0.75rem;
        // flex: 1;
        
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
   history,
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
        <form onSubmit={event => {
          event.preventDefault();
          if (!readOnly) {
            onPostSetting(setting);
            history.push('/dashboard');
          }
        }}>
          <div className={"input-container"}>
            <label htmlFor={"subway_station_id"}>
              <img src={label_subway_station} />
            </label>
            {
              readOnly ? (
                <input name={"subway_station_id"}
                       placeholder={"지하철역 ID"}
                       value={setting.data.subway_station_nm}
                       disabled={readOnly}
                />
              ) : (
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
              )
            }
            <div className={"description"}>
              <span>{ "(도착)" }</span>
            </div>
          </div>

          <div className={"input-container"}>
            <label htmlFor={"bus_id"}>
              <img src={label_bus} />
            </label>
            {
              readOnly ? (
                <input name={"bus_id"}
                       placeholder={"버스 ID"}
                       value={setting.data.bus_nm}
                       defaultValue={"023"}
                       disabled={readOnly}
                >
                </input>
              ) : (
                <select name={"bus_id"}
                        placeholder={"버스 ID"}
                        onChange={onChangeInputBus}
                        value={setting.data.bus_id}
                        disabled={readOnly}
                >
                  <option key={"241312015"} value={"241312015"}>
                    023
                  </option>
                </select>
              )
            }
            <div className={"description"}>
              <span> </span>
            </div>
          </div>

          <div className={"input-container"}>
            <label htmlFor={"bus_station_id"}>
              <img src={label_bus_station} />
            </label>
            {
              readOnly ? (
                <input name={"bus_station_id"}
                       placeholder={"버스 정류장 ID"}
                       value={setting.data.bus_station_nm}
                       disabled={readOnly}
                />
              ) : (
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
              )
            }
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
                  !(loadingSetting || loadingAvailableSubwayStations || postingSetting) && '조회'
                }
            </button>
          </div>
        </form>
        <div style={{
            display: readOnly ? "none" : "visible",
            marginTop:'4rem',
            marginBottom: '4rem',
            wordBreak:'keep-all',
            paddingLeft:'1rem',
            paddingRight:'1rem',
        }}>
          <p>안녕하세요. 고마타 기획자 장우영 입니다.</p>
          <p>고마타(고양시마을버스타요)는 </p>
          <p>집 앞에서 마을버스 타고 편하게 지하철을 환승할 수 없을까? 라는 생각에서 기획하게 되었습니다.</p>
          <ul>
            <li> 마을버스는 왜 정류장 별로 시간표가 없을까?</li>
            <li> 왜 우리집 마을버스는 맨날 회차대기, 버스정보없음 일까?</li>
            <li> 지금 마을버스를 타면 몇시 지하철을 탈 수 있을까?</li>
          </ul>
          <p>고마타에서 위 3가지 궁금증을 해결해보세요</p>
        </div>
      </section>
    </SettingBlock>
  );
};

export default withRouter(Setting);