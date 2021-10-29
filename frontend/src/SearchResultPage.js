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
    const [selectedSubway, setSelectedSubway] = useState(undefined);
    const [selectedBus, setSelectedBus] = useState(undefined);

    useEffect(() => {
        setIsLoading(true);
        
        const timeStr = (str) => {
            return new Date(str).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' });
        };

        api.getArrival({ bus_id: 241312015, bus_station_id: bus, subway_station_id: sub }).then(data => {
            if(!data.data.data.estimated_run_time || !data.data.data.estimated_arrival_time) {
                // data not prepared yet
                return;
            }

            setRunTime(data.data.data.estimated_run_time);
            setDepartTime(timeStr(data.data.timestamp));
            setArriveTime(timeStr(data.data.data.estimated_arrival_time));
            setIsLoading(false);
        });
    }, [bus, sub]);

    return (
        <div className='search-result-page' style={{ left: hide ? '100%' : 0 }}>
            <div className='search-result-page-overview'>
                <img className='search-result-page-back-button' src={arrowL} alt='back button' onClick={() => { onHide() }}/>
                <div className='search-result-page-overview-dest'>
                    {`${sub}까지`}
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
                        <span className='search-result-page-detail-time'>06:37</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{bus}</div>
                    <div className='search-result-page-detail-subtitle'>{'2분 후 도착'}</div>
                    <div className='search-result-page-detail-subsubtitle'>네이버 실시간 정보 기반</div>
                    <div>
                        <span className='search-result-page-detail-subtitle'>{'또는' + ' 2분 후 도착'}</span>
                        <span className='search-result-page-detail-time-hl'>06:37</span>
                    </div>
                    <div className='search-result-page-detail-subsubtitle'>고양시 데이터 기반</div>
                    <div className='search-result-page-detail-subtitle'>{'다음 도착 예정 시간'}</div>
                    <div className='search-result-page-detail-link'>{'버스시간표 전체 보기'}</div>
                </div>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>{`${sub} 하차`}</span>
                        <span className='search-result-page-detail-time'>06:37</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{'도보 2분'}</div>
                </div>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>도착</span>
                        <span className='search-result-page-detail-subtitle'>{`${sub} 승강장`}</span>
                        <span className='search-result-page-detail-time'>06:37</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{'도보 2분'}</div>
                    <div className='search-result-page-detail-subtitle'>{'도보 2분'}</div>
                    <div className='search-result-page-detail-subtitle'>{'도보 2분'}</div>
                </div>
            </div>
        </div>
    );
}

export default SearchResultPage;
