import React, { useEffect, useMemo, useState } from "react";

import * as api from './lib/api/arrival.js';

import arrowL from './media/img/arrow-l.png';
import illust from './media/img/search_result_page_illust.svg';

function SearchResultPage(props) {
    const {
        bus,
        sub,
        hide,
        onHide
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [runTime, setRunTime] = useState();
    const [departTime, setDepartTime] = useState();
    const [arriveTime, setArriveTime] = useState();
    const [naverTime, setNaverTime] = useState();
    const [goyangTime, setGoyangTime] = useState();
    const [nextBusArriveTime, setNextBusArriveTime] = useState();
    const [naverBusArriveTime, setNaverBusArriveTime] = useState();
    const [departTimeMinusWalk, setDepartTimeMinusWalk] = useState();
    const [subwayDetailUpward, setSubwayDetailUpward] = useState();
    const [subwayDetailDownward, setSubwayDetailDownward] = useState();
    const [selectedSubway, setSelectedSubway] = useState(undefined);
    const [selectedBus, setSelectedBus] = useState(undefined);

    useEffect(() => {
        setIsLoading(true);
        
        const timeStr = (str, plusMin) => {
            return plusMin ? 
                new Date((new Date(str)).getTime() + +plusMin * 60000).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })
                : new Date(str).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' });
        };

        api.getArrival({ bus_id: 241312015, bus_station_id: bus.id, subway_station_id: sub.id }).then(data => {
            if(!data.data.data.estimated_run_time || !data.data.data.estimated_arrival_time) {
                // data not prepared yet
                return;
            }

            console.log(data.data);

            setRunTime(data.data.data.estimated_run_time);
            setDepartTime(timeStr(data.data.timestamp));
            setArriveTime(timeStr(data.data.data.estimated_arrival_time));

            setNaverTime(data.data.data.bus.realtime);
            setGoyangTime(data.data.data.bus.expectations[0]);
            setNextBusArriveTime(timeStr(data.data.timestamp, data.data.data.bus.expectations[1]));
            setNaverBusArriveTime(timeStr(data.data.timestamp, data.data.data.bus.realtime));

            setDepartTimeMinusWalk(timeStr(data.data.data.estimated_arrival_time, "-2"));
            setSubwayDetailUpward(data.data.data.subway.upward.join(', '));
            setSubwayDetailDownward(data.data.data.subway.downward.join(', '));
            setIsLoading(false);
        });
    }, [bus, sub]);

    return (
        <div className='search-result-page' style={{ left: hide ? '100%' : 0 }}>
            <div className='search-result-page-overview'>
                <img className='search-result-page-back-button' src={arrowL} alt='back button' onClick={() => { onHide() }}/>
                <div className='search-result-page-overview-dest'>
                    {`${sub.name}까지`}
                </div>
                <div className='search-result-page-overview-min'>
                    {runTime ? `${runTime}분` : '조회중...'}
                </div>
                <div className='search-result-page-overview-time'>
                    {`출발 ${departTime ?? '00:00'} - 도착 ${arriveTime ?? '00:00'}`}
                </div>
                <img className='search-result-page-illustration' src={illust} alt='Illustration'/> 
            </div>
            <div className='search-result-page-detail'>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>출발</span>
                        <span className='search-result-page-detail-time'>{departTime ?? '00:00'}</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{bus.name}</div>
                    <div>
                        <div className='search-result-page-detail-subtitle'>{naverTime ? `${naverTime}분 후 도착` : '정보 없음'}</div>
                        <span className='search-result-page-detail-time-hl'>{naverBusArriveTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-subsubtitle'>네이버 실시간 정보 기반</div>
                    <span className='search-result-page-detail-subtitle'>{goyangTime ? `또는 ${goyangTime}분 후 도착` : '정보 없음'}</span>
                    <div className='search-result-page-detail-subsubtitle'>고양시 데이터 기반</div>
                    <div>
                        <span className='search-result-page-detail-subtitle'>{'다음 도착 예정 시간'}</span>
                        <span className='search-result-page-detail-time'>{nextBusArriveTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-link'>{'버스시간표 전체 보기'}</div>
                </div>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>{`${sub.name} 하차`}</span>
                        <span className='search-result-page-detail-time'>{departTimeMinusWalk ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{'도보 2분'}</div>
                </div>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>도착</span>
                        <span className='search-result-page-detail-subtitle'>{`${sub.name} 승강장`}</span>
                        <span className='search-result-page-detail-time'>{arriveTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{'지하철 도착 예정 시간'}</div>
                    <div className='search-result-page-detail-subtitle'>{subwayDetailUpward ? `상행 ${subwayDetailUpward}` : ''}</div>
                    <div className='search-result-page-detail-subtitle'>{subwayDetailDownward ? `하행 ${subwayDetailDownward}` : ''}</div>
                </div>
            </div>
        </div>
    );
}

export default SearchResultPage;
