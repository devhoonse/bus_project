import React from 'react';


const Home = ({ loadingArrival, loadingSetting, arrival }) => {
  return (
    <div>
      <section>
        <h1>홈 화면</h1>
        {(loadingSetting || loadingArrival) && '로딩 중 ...'}
        <p>
          {!(loadingSetting || loadingArrival) && arrival && (
            JSON.stringify(arrival, null, 2)
          )}
        </p>
      </section>
    </div>
  );
};

export default Home;