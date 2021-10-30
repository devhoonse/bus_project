import React, { useEffect, useMemo, useState } from "react";

import * as infoApi from './lib/api/info.js';

import background from './media/img/background.png';
import logo from './media/img/logo.png';
import info from './media/img/info_icon.png';
import illust from './media/img/search_page_illust.svg';

function SearchPage(props) {
    const {
        onSearch,
        onInfo,
        onSchedule
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [subways, setSubways] = useState([]);
    const [buses, setBuses] = useState([]);
    const [selectedSub, setSelectedSub] = useState({ id: '행신역', name: '행신역' });
    const [selectedBus, setSelectedBus] = useState({ id: 218000542, name: '샘터마을1단지.무원고등학교' });

    useEffect(() => {
        setIsLoading(true);
        
        // TODO: Position data is not yet used in the API (https://github.com/devhoonse/bus_project/blob/fe955ee953fa07186311595cc0c47101286d6a50/api/controller/Info.py#L46) --> next year
        infoApi.getAvailableSubwayStations({longitude: 0, latitude: 0}).then(data => {
            setSubways(data.data.data.list);
        });

        // We have only one bus and subway_station 
        infoApi.getAvailableBusStations({ bus_id: 241312015, subway_station_id: '행신역' }).then(data => {
            setBuses(data.data.data.list);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if(!selectedSub) {
            // We do not have sufficient data
            return;
        }

        setIsLoading(true);
        
        // We have only one bus
        infoApi.getAvailableBusStations({ bus_id: 241312015, subway_station_id: selectedSub.id }).then(data => {
            setBuses(data.data.data.list);
            setIsLoading(false);
        });
    }, [selectedSub]);

    return (
        <div className='search-page' style={{ backgroundImage: `url(${background})` }}>
            <div className='search-page-navbar'>
                <img className='search-page-logo' src={logo} alt='logo'/>
                고양시 마을버스 타요
                <img className='search-page-info' src={info} alt='info' onClick={() => {onInfo()}}/>
            </div>
            <img className='search-page-illustration' src={illust} alt='Illustration'/> 
            <div className='search-page-question'>
                마을버스를 타고 어떤 지하철역에서 환승하세요?    
            </div>
            <div className='search-page-dropdown'>
                <span className='search-page-dropdown-title'>
                    출발
                </span>
                <span className='search-page-dropdown-subtitle'>
                    버스정류장
                </span>
                <span className='search-page-dropdown-desc'> 
                    *023번 마을버스 경로만 제공됩니다. 
                </span>
                <select required value={selectedBus.id} onChange={(e) => {
                    // console.log(e.target.options);
                    setSelectedBus({ id: e.target.value, name: e.target.options[e.target.options.selectedIndex].label});
                }}>
                    {/* <option value="" disabled selected hidden>출발할 버스 정류장을 선택하세요</option> */}
                    {buses.map(d => (
                        <option key={d.label} value={d.value}>{d.label}</option>
                    ))}
                </select>
            </div>
            <div className='search-result-page-detail-link' style={{ marginLeft: '20px', marginTop: '10px' }} onClick={() => onSchedule()}>{'버스시간표 전체 보기'}</div>
            <div className='search-page-dropdown'>
                <span className='search-page-dropdown-title'>
                    도착 
                </span>
                <span className='search-page-dropdown-subtitle'>
                    환승 지하철역
                </span>
                <select required disabled onChange={(e) => {
                    setSelectedSub({ id: e.target.value, name: e.target.value });
                }}>
                    {/* <option value="" disabled selected hidden>환승할 지하철역을 선택하세요</option> */}
                    {subways.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                </select>
            </div>
            <div className={!selectedBus || !selectedSub? 'search-page-button-disabled' : 'search-page-button'} onClick={() => {
                onSearch({selectedBus, selectedSub}); 
            }}>
                {isLoading ? '로딩중...' : '조회'}
            </div>
        </div>
    );
}

export default SearchPage;
