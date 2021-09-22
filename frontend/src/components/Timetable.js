import React from 'react';


const Timetable = ({ loadingSetting, loadingTimetable, timetable }) => {
  return (
    <div>
      <section>
        <h1>시간표 화면</h1>
        {(loadingSetting || loadingTimetable) && '로딩 중 ...'}
        {!(loadingSetting || loadingTimetable) && timetable && (
          JSON.stringify(timetable, null, 2)
        )}
      </section>
    </div>
  );
};

export default Timetable;