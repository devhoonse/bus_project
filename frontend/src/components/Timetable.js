import React from 'react';

import styled from "styled-components";


const TimetableBlock = styled.div`
  section {
    margin-top: 2rem;
    // display: flex;
    
    form {
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
    
    img {
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      flex: 1;
    }    
  }
`;


const Timetable = ({ loadingSetting, loadingTimetable, timetable }) => {
  return (
    <TimetableBlock>
      <section>
        <form onSubmit={event => {event.preventDefault();}}>
          <div className={"button-container"}>
            <button type={"submit"}>
              {(loadingSetting || loadingTimetable) ? '로딩 중 ...' : '더 보기'}
            </button>
          </div>
        </form>

        <div style={{
          paddingTop: '0.5rem',
          paddingBottom: '1rem',
          marginLeft: '1.5rem',
          marginRight: '1.5rem',
          wordBreak: 'keep-all',
        }}
        >
          <p>
            * 노선별 정류장별 버스시간표는 과거 평일 도착시간을 기반으로 작성되었습니다. 실제 버스도착 시간과는 차이가 있을 수 있습니다.
          </p>
        </div>

        {/*<h1>시간표 화면</h1>*/}
        {/*{(loadingSetting || loadingTimetable) && '로딩 중 ...'}*/}
        {/*{!(loadingSetting || loadingTimetable) && timetable && (*/}
        {/*  JSON.stringify(timetable, null, 2)*/}
        {/*)}*/}
        {!(loadingSetting || loadingTimetable) && timetable && (
          <img src={`data:image/png;base64,${timetable.timetable.byte_string}`}
               alt={"Timetable Not Found"}
          />
        )}

      </section>
    </TimetableBlock>
  );
};

export default Timetable;