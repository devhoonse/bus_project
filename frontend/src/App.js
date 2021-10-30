import React, {useState, useRef} from 'react';
import styled from "styled-components";
import ImageFadeIn from "react-image-fade-in";
import {NavLink, Route} from "react-router-dom";

// import Home from "./components/Home";
// import Timetable from "./components/Timetable";
// import Setting from "./components/Setting";
import NavLinkButton from "./components/button/NavLinkButton";
import HomeContainer from "./containers/HomeContainer";
import TimetableContainer from "./containers/TimetableContainer";
import SettingContainer from "./containers/SettingContainer";
import home from "./media/img/home_211017.png";
import home_cut from "./media/img/home_cut.png";
import home_default from "./media/img/home_default.png";
import home_hover from "./media/img/home_hover.png";
import home_select from "./media/img/home_select.png";
import schedule_default from "./media/img/schedule_default.png";
import schedule_hover from "./media/img/schedule_hover.png";
import schedule_select from "./media/img/schedule_select.png";
import setting_default from "./media/img/setting_default.png";
import setting_hover from "./media/img/setting_hover.png";
import setting_select from "./media/img/setting_select.png";
import Intro from "./components/Intro";

import SearchPage from "./SearchPage.js";
import SearchResultPage from "./SearchResultPage.js";
import InfoPage from "./InfoPage.js";
import SchedulePage from "./SchedulePage.js";
import './App.css';

const DEBUG_MODE = false;

const App = () => {

    const [showSearchResult, setShowSearchResult] = useState(DEBUG_MODE);
    const [showInfoPage, setShowInfoPage] = useState(DEBUG_MODE);
    const [showSchedule, setShowSchedule] = useState(DEBUG_MODE);

    const [selectedBus, setSelectedBus] = useState('');
    const [selectedSub, setSelectedSub] = useState('');
    const [schedule, setSchedule] = useState([]);

    return (
        <>
            <SearchPage 
                onSearch={props => { 
                    setSelectedBus(props.selectedBus);
                    setSelectedSub(props.selectedSub);
                    setShowSearchResult(true); 
                }}
                onInfo={() => setShowInfoPage(true)}
            />
            <InfoPage
                hide={!showInfoPage}
                onHide={() => setShowInfoPage(false)}
            />
            <SearchResultPage 
                bus={selectedBus}
                sub={selectedSub}
                hide={!showSearchResult}
                onHide={() => setShowSearchResult(false)}
                onSchedule={() => setShowSchedule(true)}
                setSchedule={(props) => setSchedule(props)}
            />
            <SchedulePage
                bus={selectedBus}
                sub={selectedSub}
                hide={!showSchedule}
                onHide={() => setShowSchedule(false)}
            />
        </>
    );
};

export default App;
