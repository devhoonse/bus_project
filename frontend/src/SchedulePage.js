import React, { useEffect, useState } from "react";

import * as api from './lib/api/arrival.js';

import close from './media/img/close.png';

function SchedulePage(props) {
    const {
        bus,
        sub,
        hide,
        onHide
    } = props;

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        if(bus && sub) {
            api.getArrival({ bus_station_id: bus.id, bus_id: 241312015, subway_station_id: sub.id }).then(data => {
                // console.log(data);
                if(data.data.data.station?.scheduleDetail)
                    setSchedule(data.data.data.station.scheduleDetail);
            });
        }
    }, [bus, sub]);

    return (
        <div className='schedule-page' style={{ top: hide ? '100%' : 0 }}>
            <img className='close-button' src={close} alt='close' onClick={() => onHide()}/>
            <div style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '20px', marginTop: '80px' }}>{bus.name}</div>
            <div style={{ fontSize: '12px', marginLeft: '20px', marginTop: '4px', marginRight: '20px', color: 'rgba(0, 0, 0, 0.4)' }}>
                *버스 시간표는 과거 평일 도착시간을 기반으로 작성되었습니다. 실제 버스 도착시간과 차이가 있을 수 있습니다.
            </div>
            {Array.from(new Set(schedule.map(d => d.h))).map(h => {
                return (
                    <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }} key={h}>
                        <span style={{ fontWeight: 'bold' }}>{`${h < 10 ? '0' : ''}${h}시`}</span>
                        <span style={{ marginLeft: '3px' }}>
                            {schedule.filter(s => s.h === h).map(s => (
                                <span style={{ marginLeft: '6px' }} key={s.m}>{+s.m < 10 ? `0${s.m}` : s.m}</span>
                            ))}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default SchedulePage;
