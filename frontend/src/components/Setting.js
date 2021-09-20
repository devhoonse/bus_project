import React from 'react';


const Setting = ({ loadingSetting, postingSetting, setting, onPostSetting, onChangeInputBus, onChangeInputSubwayStation, onChangeInputBusStation }) => {
  return (
    <div>
      <section>
        <h1>설정 화면</h1>
        {(loadingSetting || postingSetting) && '로딩 중 ...'}
        <p>
          {!(loadingSetting || postingSetting) && setting && (
            JSON.stringify(setting, null, 2)
          )}
        </p>
        <form onSubmit={event => {event.preventDefault();onPostSetting(setting)}}>
          <input name={"bus_id"}
                 placeholder={"버스 ID"}
                 onChange={onChangeInputBus}
                 value={setting.data.bus_id}  />
          <input name={"bus_station_id"}
                 placeholder={"버스 정류장 ID"}
                 onChange={onChangeInputBusStation}
                 value={setting.data.bus_station_id} />
          <input name={"subway_station_id"}
                 placeholder={"지하철역 ID"}
                 onChange={onChangeInputSubwayStation}
                 value={setting.data.subway_station_id} />
          <button type={"submit"}>저장</button>
        </form>
      </section>
    </div>
  );
};

export default Setting;