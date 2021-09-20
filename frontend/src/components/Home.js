import React from 'react';


const Home = ({ loadingArrival, arrival }) => {
  return (
    <div>
      <section>
        <h1>홈 화면</h1>
        {loadingArrival && '로딩 중 ...'}
        {!loadingArrival && arrival && (
          JSON.stringify(arrival, null, 2)
        )}
      </section>
    </div>
  );
};

export default Home;