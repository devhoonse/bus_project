import React from 'react';

import styled from "styled-components";


const TimetableBlock = styled.div`
  section {
    margin-top: 2rem;
    display: flex;
    
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
        {/*<h1>시간표 화면</h1>*/}
        {(loadingSetting || loadingTimetable) && '로딩 중 ...'}
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