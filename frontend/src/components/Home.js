import React from 'react';
import styled from "styled-components";

import real_time from "../media/img/home/real_time.png";
import pred_time from "../media/img/home/pred_time.png";
import subway_upward from "../media/img/home/sub_f.png";
import subway_downward from "../media/img/home/sub_b.png";
import inq_time from "../media/img/home/inq_time.png";
import total_time from "../media/img/home/tot_time.png";
import to_station from "../media/img/home/to_station.png";
import wait_time from "../media/img/home/wait_time.png";
import run_time from "../media/img/home/run_time.png";
import walk_time from "../media/img/home/walk_time.png";
import cross_time from "../media/img/home/cross.png";


const HomeBlock = styled.div`
  form {
    // margin-top: 5rem;
    
    div.text-decorator {
      margin-left: 1rem; 
      margin-top: 2rem;
      margin-bottom: 0.5rem; 
      color: #f99;
    }
    
    div.info-container {
      position: relative;
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
        flex: 1;
        
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
        right: -20rem;
        outline: none;
        border: none;
        min-width: 30rem;
        font-size: 0.875rem;
        
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
      margin-top: 2rem;
      margin-bottom: 2rem;
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


const Home = ({ loadingArrival, loadingSetting, arrival, setting, onRefresh }) => {
  return (
    <HomeBlock>
      <section>
        {/*<h1>홈 화면</h1>*/}
        {/*<p>*/}
        {/*  {!(loadingSetting || loadingArrival) && arrival && (*/}
        {/*    JSON.stringify(arrival, null, 2)*/}
        {/*  )}*/}
        {/*</p>*/}
        <form onSubmit={event => {event.preventDefault();onRefresh(setting)}}>
          <div className={"button-container"}>
            <button type={"submit"}>
              {(loadingSetting || loadingArrival) ? '로딩 중 ...' : '조회'}
            </button>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"timestamp"}>
              <img src={inq_time}
                   alt={"timestamp"}
              />
            </label>
            <input name={"timestamp"}
                   placeholder={"도착 정보 요청시각"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     (arrival.timestamp ?
                         new Date(arrival.timestamp).toLocaleTimeString('ko-KR', {hour12: false}) :
                         new Date().toLocaleTimeString('ko-KR', {hour12: false}))
                   }
                   disabled={true}
            />
          </div>

          <div className={"text-decorator"}>
            <b>버스 도착 정보</b>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"realtime"}>
              <img src={real_time}
                   alt={"realtime"}
              />
            </label>
            <input name={"realtime"}
                   placeholder={"실시간 버스 도착 정보"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.bus ?
                         arrival.data.bus.realtime ?
                             `${arrival.data.bus.realtime} 분` :
                             '정보 없음'
                         : '정보 없음'
                   }
                   disabled={true}
            />
          </div>

          <div className={"info-container"}>
            <label htmlFor={"predtime"}>
              <img src={pred_time}
                   alt={"predtime"}
              />
            </label>
            <input name={"predtime"}
                   placeholder={"버스 도착 추정시간"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.bus ?
                         `${arrival.data.bus.expectations[0]} 분` :
                         '정보 없음'
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>{ "(과거 도착정보 기반)" }</span>
            </div>
          </div>

          <div className={"text-decorator"}>
            <b>지하철 출발 정보</b>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"subway-upward"}>
              <img src={subway_upward}
                   alt={"subway-upward"}
              />
            </label>
            <input name={"subway-upward"}
                   placeholder={"지하철역 상행선 도착 예정 정보"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.subway ?
                         arrival.data.subway.upward.join(' , ') :
                         '정보 없음'
                   }
                   disabled={true}
            />
          </div>

          <div className={"info-container"}>
            <label htmlFor={"subway-downward"}>
              <img src={subway_downward}
                   alt={"subway-downward"}
              />
            </label>
            <input name={"subway-downward"}
                   placeholder={"지하철역 하행선 도착 예정 정보"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.subway ?
                         arrival.data.subway.downward.join(' , ') :
                         '정보 없음'
                   }
                   disabled={true}
            />
          </div>

          <div className={"text-decorator"}>
            <b>지하철역 도착시간&nbsp;&nbsp;:&nbsp;&nbsp;</b>
            <span className={"sentence"}>
                {
                  !(loadingSetting || loadingArrival) &&
                  arrival &&
                  arrival.data.estimated_arrival_time ?
                      new Date(arrival.data.estimated_arrival_time).toLocaleTimeString('ko-KR', {hour12: false}) : '정보 없음'
                }
            </span>
          </div>

          {/*<div className={"info-container"} style={{ 'margin-top': '2rem', }}>*/}
          {/*  <label htmlFor={"subway-arrival"}>*/}
          {/*    지하철역 도착시간*/}
          {/*  </label>*/}
          {/*  <input name={"subway-arrival"}*/}
          {/*         placeholder={"지하철역 도착 예상 시간"}*/}
          {/*         value={*/}
          {/*           !(loadingSetting || loadingArrival) &&*/}
          {/*           arrival &&*/}
          {/*           arrival.data.estimated_arrival_time ?*/}
          {/*               new Date(arrival.data.estimated_arrival_time).toLocaleTimeString() : '정보 없음'*/}
          {/*         }*/}
          {/*         disabled={true}*/}
          {/*  />*/}
          {/*</div>*/}

          <div className={"info-container"}>
            <label htmlFor={"total-time"}>
              <img src={to_station}
                   alt={"total-time"}
              />
            </label>
            <input name={"total-time"}
                   placeholder={"지하철역까지 총 예상 소요시간"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.total_duration ?
                         `${arrival.data.total_duration} 분` :
                         '정보 없음'
                   }
                   disabled={true}
            />
          </div>

          <div className={"info-container"}>
            <label htmlFor={"wait-time"}>
              <img src={wait_time}
                   alt={"wait-time"}
              />
            </label>
            <input name={"wait-time"}
                   placeholder={"마을버스가 오기까지 예상 소요 시간"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.estimated_run_time ?
                         `${arrival.data.estimated_run_time} 분` :
                         '정보 없음'
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(버스 도착까지 대기시간)" }
              </span>
            </div>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"run-time"}>
              <img src={run_time}
                   alt={"run-time"}
              />
            </label>
            <input name={"run-time"}
                   placeholder={"마을버스 탑승 후 지하철까지 예상 소요 시간"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival.data.bus ?
                         `${arrival.data.bus.duration} 분` :
                         '정보 없음'
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(지하철역까지 버스 운행시간)" }
              </span>
            </div>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"walk-time"}>
              <img src={walk_time}
                   alt={"walk-time"}
              />
            </label>
            <input name={"walk-time"}
                   placeholder={"마을버스 하차 후 지하철역까지 도보 소요 시간"}
                   value={
                     `${2} 분`
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(하차 후 지하철까지 도보시간)" }
              </span>
            </div>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"cross-time"}>
              <img src={cross_time}
                   alt={"cross-time"}
              />
            </label>
            <input name={"cross-time"}
                   placeholder={"마을버스 하차 후 지하철역까지 횡단보도 소요 시간"}
                   value={
                     `${0} 분`
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(횡단보도 대기 시간)" }
              </span>
            </div>
          </div>

        </form>
      </section>
    </HomeBlock>
  );
};

export default Home;