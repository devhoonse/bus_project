import React from 'react';
import styled from "styled-components";

import SettingViewerContainer from "../containers/SettingViewerContainer";
import SettingContainer from "../containers/SettingContainer";


const HomeBlock = styled.div`
`;


const Home = ({ loadingArrival, loadingSetting, arrival }) => {
  return (
    <HomeBlock>
      <section>
        {/*<h1>홈 화면</h1>*/}
        {(loadingSetting || loadingArrival) && '로딩 중 ...'}
        {/*<p>*/}
        {/*  {!(loadingSetting || loadingArrival) && arrival && (*/}
        {/*    JSON.stringify(arrival, null, 2)*/}
        {/*  )}*/}
        {/*</p>*/}
        <div>
          <h6>조회시간 : {
              !(loadingSetting || loadingArrival) &&
              arrival &&
              (arrival.timestamp ?
                  new Date(arrival.timestamp).toLocaleTimeString() :
                  new Date().toLocaleTimeString())
          }
          </h6>
          <h4>({
              !(loadingSetting || loadingArrival) &&
              arrival &&
              (arrival.params.bus_id || '버스 ID')
          })
          </h4>
          <div>
            도착예정 : ({ !(loadingSetting || loadingArrival) &&
              arrival &&
              arrival.data.bus ?
              arrival.data.bus.expectations[0] : 99 }) 분 후 도착
          </div>
          <div>
            실시간 : ({ !(loadingSetting || loadingArrival) &&
              arrival &&
              arrival.data.bus ?
              arrival.data.bus.realtimes[0] : 99 }) 분 후 도착
          </div>
          <div>
            소요시간 : ({ !(loadingSetting || loadingArrival) &&
              arrival &&
              arrival.data.bus ?
              arrival.data.bus.duration : 99 }) 분
          </div>
          <h4>({
            !(loadingSetting || loadingArrival) &&
            arrival &&
            (arrival.params.subway_station_id || '지하철역 ID')
          })
          </h4>
          <div>
            상행 : ({ !(loadingSetting || loadingArrival) &&
              arrival &&
              arrival.data.subway ?
              new Date(arrival.data.subway.upward).toLocaleTimeString().slice(0, -3) : 'unknown' })
          </div>
          <div>
            하행 : ({ !(loadingSetting || loadingArrival) &&
              arrival &&
              arrival.data.subway ?
              new Date(arrival.data.subway.downward).toLocaleTimeString().slice(0, -3) : 'unknown' })
          </div>
        </div>
      </section>
    </HomeBlock>
  );
};

export default Home;