import React, { useEffect, useMemo, useState } from "react";

import * as api from './lib/api/arrival.js';

import arrowL from './media/img/arrow-l.png';
import illust from './media/img/search_result_page_illust.svg';
import busIcon from './media/img/bus_icon.png';
import transferIcon from './media/img/transfer.png';

function SearchResultPage(props) {
    const {
        bus,
        sub,
        hide,
        onHide,
        onSchedule,
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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

    useEffect(() => {
        // Reset data when hiding
        setIsLoading(false);
        setIsSuccess(false);
        setRunTime();
        setDepartTime();
        setArriveTime();
        setNaverTime();
        setGoyangTime();
        setNextBusArriveTime();
        setNaverBusArriveTime();
        setDepartTimeMinusWalk();
        setSubwayDetailUpward();
        setSubwayDetailDownward();
    }, [hide]);

    useEffect(() => {
        setIsLoading(true);
        const timeStr = (str, plusMin) => {
            return plusMin ? 
                new Date((new Date(str)).getTime() + +plusMin * 60000).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })
                : new Date(str).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' });
        };

        api.getArrival({ bus_id: 241312015, bus_station_id: bus.id, subway_station_id: sub.id }).then(data => {
            setIsLoading(false);

            if(!data.data.data.estimated_run_time || !data.data.data.estimated_arrival_time) {
                // data not prepared yet
                return;
            }

            // console.log(data.data);

            setRunTime(data.data.data.total_duration);
            setDepartTime(timeStr(data.data.timestamp));
            setArriveTime(timeStr(data.data.data.estimated_arrival_time));

            setNaverTime(data.data.data.bus.realtime);
            setGoyangTime(data.data.data.bus.expectations.value[0]);
	    setNextBusArriveTime(data.data.data.bus.expectations.nextArrivalTime);
	    setNaverBusArriveTime(data.data.data.bus.expectations.firstArrivalTime);
	    //setNextBusArriveTime(timeStr(data.data.timestamp, data.data.data.bus.expectations.value[1]));
            //setNaverBusArriveTime(timeStr(data.data.timestamp, data.data.data.bus.expectations.value[0]));
            //setNaverBusArriveTime(timeStr(data.data.timestamp, data.data.data.bus.expectations.realtime));

            setDepartTimeMinusWalk(timeStr(data.data.data.estimated_arrival_time, "-2"));
            setSubwayDetailUpward(data.data.data.subway.upward.join(', '));
            setSubwayDetailDownward(data.data.data.subway.downward.join(', '));
        
            setIsSuccess(true);
        });
    }, [hide, bus, sub]);

    return (
        <div className='search-result-page' style={{ left: hide ? '100%' : 0 }}>
            <div className='search-result-page-overview'>
                <img className='search-result-page-back-button' src={arrowL} alt='back button' onClick={() => { onHide() }}/>
                <div className='search-result-page-overview-dest'>
                    {`${sub.name}??????`}
                </div>
                <div className='search-result-page-overview-min'>
                    {runTime ? `${runTime}???` : isLoading ? '?????????...' : !isSuccess ? '?????? ??????' : ''}
                </div>
                <div className='search-result-page-overview-time'>
                    {`?????? ${departTime ?? '00:00'} - ?????? ${arriveTime ?? '00:00'}`}
                </div>
                <img className='search-result-page-illustration' src={illust} alt='Illustration'/> 
            </div>
            <div className='search-result-page-detail'>
                <div className='search-result-page-detail-section' style={{ paddingTop: '34px' }}>
                    <div>
                        <span className='search-result-page-detail-title'>??????</span>
                        <span className='search-result-page-detail-time'>{departTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-subtitle'>{bus.name}</div>
                    <div className='search-result-page-detail-gap'/>
                    <div>
                        <img className='search-result-page-detail-icon' src={busIcon} alt='Bus Icon'/>
                        <span className='search-result-page-detail-subtitle' style={{ marginLeft: '181px' }}>{goyangTime ? `${goyangTime}??? ??? ??????` : '?????? ??????'}</span>
                        <span className='search-result-page-detail-time-hl'>{naverBusArriveTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-subsubtitle' style={{ marginLeft: '181px' }}>????????? ????????? ??????</div>
                    <span className='search-result-page-detail-subtitle' style={{ marginLeft: '181px' }}>{naverTime ? `?????? ${naverTime}??? ??? ??????` : '?????? ??????'}</span>
                    <div className='search-result-page-detail-subsubtitle' style={{ marginLeft: '181px' }}>????????? ????????? ??????</div>
                    <div className='search-result-page-detail-gap'/>
                    <div>
                        <span className='search-result-page-detail-subtitle'>{'?????? ?????? ?????? ??????'}</span>
                        <span className='search-result-page-detail-time' style={{ position: 'inherit', marginLeft: '4px' }}>{nextBusArriveTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-link' onClick={() => onSchedule()}>{'??????????????? ?????? ??????'}</div>
                </div>
                <div className='search-result-page-detail-gap-lg' style={{ height: '30px' }}/>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>{`${sub.name} ??????`}</span>
                        <span className='search-result-page-detail-time'>{departTimeMinusWalk ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-gap-lg'/>
                    <img className='search-result-page-detail-icon' src={transferIcon} alt='Transfer Icon'/>
                    <div className='search-result-page-detail-subtitle' style={{ marginLeft: '122px' }}>{'?????? 2???'}</div>
                </div>
                <div className='search-result-page-detail-gap-lg'/>
                <div className='search-result-page-detail-section'>
                    <div>
                        <span className='search-result-page-detail-title'>??????</span>
                        <span className='search-result-page-detail-subtitle'>{`${sub.name} ?????????`}</span>
                        <span className='search-result-page-detail-time'>{arriveTime ?? ''}</span>
                    </div>
                    <div className='search-result-page-detail-gap-lg'/>
                    <div className='search-result-page-detail-subtitle'>{'????????? ?????? ?????? ??????'}</div>
                    <div className='search-result-page-detail-subtitle'>{subwayDetailUpward ? `?????? ${subwayDetailUpward}` : ''}</div>
                    <div className='search-result-page-detail-subtitle'>{subwayDetailDownward ? `?????? ${subwayDetailDownward}` : ''}</div>
                </div>
                {/* Left Timeline Icons */}
                <span className='icon vl'/>
                <span className='icon t-o'/>
                <span className='icon t-i'/>
                <span className='icon b'/>
                <span className='icon dot3-1'/>
                <span className='icon dot3-2'/>
                <span className='icon dot3-3'/>
                <span className='icon b-o'/>
                <span className='icon b-i'/>
            </div>
        </div>
    );
}

export default SearchResultPage;
