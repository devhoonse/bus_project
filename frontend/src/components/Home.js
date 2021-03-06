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
      // position: relative;
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
        width: 180%;
        flex: 2;
        
        &:disabled {
          -moz-appearance: none;
          -webkit-appearance: none;
        }
        
        &::placeholder {
          color: #dee2e6;
        }
      }
      
      div.description {
        // position: sticky;
        right: 1rem;
        outline: none;
        border: none;
        width: 10rem;
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
        {/*<h1>??? ??????</h1>*/}
        {/*<p>*/}
        {/*  {!(loadingSetting || loadingArrival) && arrival && (*/}
        {/*    JSON.stringify(arrival, null, 2)*/}
        {/*  )}*/}
        {/*</p>*/}
        <form onSubmit={event => {event.preventDefault();onRefresh(setting)}}>
          <div className={"button-container"}>
            <button type={"submit"}>
              {(loadingSetting || loadingArrival) ? '?????? ??? ...' : '????????????'}
            </button>
          </div>

          {/*<div className={"info-container"}>*/}
          {/*  <label htmlFor={"timestamp"}>*/}
          {/*    <img src={inq_time}*/}
          {/*         alt={"timestamp"}*/}
          {/*    />*/}
          {/*  </label>*/}
          {/*  <input name={"timestamp"}*/}
          {/*         placeholder={"?????? ?????? ????????????"}*/}
          {/*         value={*/}
          {/*           !(loadingSetting || loadingArrival) &&*/}
          {/*           arrival &&*/}
          {/*           (arrival.timestamp ?*/}
          {/*               new Date(arrival.timestamp).toLocaleTimeString('ko-KR', {hour12: false}) :*/}
          {/*               new Date().toLocaleTimeString('ko-KR', {hour12: false}))*/}
          {/*         }*/}
          {/*         disabled={true}*/}
          {/*  />*/}
          {/*</div>*/}

          <div className={"text-decorator"}>
            <b>?????? ?????? ??????</b>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"realtime"}>
              <img src={real_time}
                   alt={"realtime"}
              />
            </label>
            <input name={"realtime"}
                   placeholder={"????????? ?????? ?????? ??????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.bus ?
                         arrival.data.bus.realtime ?
                             `${arrival.data.bus.realtime} ???` :
                             '?????? ??????'
                         : '?????? ??????'
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
                   placeholder={"?????? ?????? ????????????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.bus ?
                         `${arrival.data.bus.expectations.value[0]} ???` :
                         '?????? ??????'
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>{ "(?????? ???????????? ??????)" }</span>
            </div>
          </div>

          <div className={"text-decorator"}>
            <b>???????????? ????????? ??????</b>
          </div>

          <div className={"info-container"}>
            <label htmlFor={"subway-upward"}>
              <img src={subway_upward}
                   alt={"subway-upward"}
              />
            </label>
            <input name={"subway-upward"}
                   placeholder={"???????????? ????????? ?????? ?????? ??????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.subway ?
                         arrival.data.subway.upward.join(' , ') :
                         '?????? ??????'
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
                   placeholder={"???????????? ????????? ?????? ?????? ??????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.subway ?
                         arrival.data.subway.downward.join(' , ') :
                         '?????? ??????'
                   }
                   disabled={true}
            />
          </div>

          <div className={"text-decorator"} style={{color: '#111'}}>
            <b>????????????&nbsp;&nbsp;:&nbsp;&nbsp;</b>
            <span className={"sentence"}>
                {
                  !(loadingSetting || loadingArrival) &&
                     arrival &&
                     (arrival.timestamp ?
                         new Date(arrival.timestamp).toLocaleTimeString('ko-KR', {hour12: false}) :
                         new Date().toLocaleTimeString('ko-KR', {hour12: false}))
                }
            </span>
          </div>
          <div className={"text-decorator"} style={{color: '#111', marginTop: '0.5rem',}}>
            <b>???????????? ????????????&nbsp;&nbsp;:&nbsp;&nbsp;</b>
            <span className={"sentence"}>
                {
                  !(loadingSetting || loadingArrival) &&
                  arrival &&
                  arrival.data.estimated_arrival_time ?
                      new Date(arrival.data.estimated_arrival_time).toLocaleTimeString('ko-KR', {hour12: false}) : '?????? ??????'
                }
            </span>
          </div>

          {/*<div className={"info-container"} style={{ 'margin-top': '2rem', }}>*/}
          {/*  <label htmlFor={"subway-arrival"}>*/}
          {/*    ???????????? ????????????*/}
          {/*  </label>*/}
          {/*  <input name={"subway-arrival"}*/}
          {/*         placeholder={"???????????? ?????? ?????? ??????"}*/}
          {/*         value={*/}
          {/*           !(loadingSetting || loadingArrival) &&*/}
          {/*           arrival &&*/}
          {/*           arrival.data.estimated_arrival_time ?*/}
          {/*               new Date(arrival.data.estimated_arrival_time).toLocaleTimeString() : '?????? ??????'*/}
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
                   placeholder={"?????????????????? ??? ?????? ????????????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.total_duration ?
                         `${arrival.data.total_duration} ???` :
                         '?????? ??????'
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
                   placeholder={"??????????????? ???????????? ?????? ?????? ??????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival &&
                     arrival.data.estimated_run_time ?
                         `${arrival.data.estimated_run_time} ???` :
                         '?????? ??????'
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(?????? ???????????? ????????????)" }
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
                   placeholder={"???????????? ?????? ??? ??????????????? ?????? ?????? ??????"}
                   value={
                     !(loadingSetting || loadingArrival) &&
                     arrival.data.bus ?
                         `${arrival.data.bus.duration} ???` :
                         '?????? ??????'
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(?????????????????? ?????? ????????????)" }
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
                   placeholder={"???????????? ?????? ??? ?????????????????? ?????? ?????? ??????"}
                   value={
                     `${2} ???`
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(?????? ??? ??????????????? ????????????)" }
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
                   placeholder={"???????????? ?????? ??? ?????????????????? ???????????? ?????? ??????"}
                   value={
                     `${0} ???`
                   }
                   disabled={true}
            />
            <div className={"description"}>
              <span>
                { "(???????????? ?????? ??????)" }
              </span>
            </div>
          </div>

        </form>
      </section>
    </HomeBlock>
  );
};

export default Home;
