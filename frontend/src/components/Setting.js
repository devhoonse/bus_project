import React from 'react';


const Setting = ({ loadingSetting, setting }) => {
  return (
    <div>
      <section>
        <h1>홈 화면</h1>
        {loadingSetting && '로딩 중 ...'}
        {!loadingSetting && setting && (
          JSON.stringify(setting, null, 2)
        )}
      </section>
    </div>
  );
};

export default Setting;