import React from 'react';


const Timetable = ({ loadingTimetable, timetable }) => {
  return (
    <div>
      <section>
        <h1>홈 화면</h1>
        {loadingTimetable && '로딩 중 ...'}
        {!loadingTimetable && timetable && (
          JSON.stringify(timetable, null, 2)
        )}
      </section>
    </div>
  );
};

export default Timetable;