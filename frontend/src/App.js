import React, {useCallback, useState} from 'react';
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
import home from "./media/img/home.png";
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


const GomataTemplate = styled.div`

  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 833px;
  overflow-y: auto;

  margin-left: auto;
  margin-right: auto;
  // margin-top: 6rem;
  border-radius: 5px;
  // background: #5c7cfa;
  
  div.main {
    position: relative;
    top: 0;
    width: 100%;
    maxWidth: 500px;
    height: ${props => !props.clicked ? '0' : '100%'};
    maxHeight: 833px;
    
    div.navbar {
      // background: #22b8cf;
      // color: white;
      // height: 4rem;
      // z-index: 300,
      position: sticky;
      top: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      list-style: none;
      
      div#Home {
        width: 33.33%;
      }
      div#Timetable {
        width: 33.33%;
      }
      div#Setting {
        flex: 1;
      }
    }
  
    div.content {
      background: white;
      top: 0;
      z-index: 1;
    }  
  }
}
`;


const App = () => {

    const [clicked, setClicked] = useState(false);
    const handleClick = useCallback(() => {
      setClicked(!clicked);
    }, []);

    return (
        <GomataTemplate clicked={clicked}>
          <Intro imgSrc={home_cut} clicked={clicked} handleClick={handleClick} />
          {
            clicked &&
            <div className={"main"}>
              <div className={"navbar"}>
                <div id={"Home"}>
                  <NavLinkButton to={"/"}
                                 exact={true}
                                 active={home_select}
                                 nonactive={home_default}
                                 hover={home_hover}
                  />
                </div>
                <div id={"Timetable"}>
                  <NavLinkButton to={"/timetable"}
                                 active={schedule_select}
                                 nonactive={schedule_default}
                                 hover={schedule_hover}
                  />
                </div>
                <div id={"Setting"}>
                  <NavLinkButton to={"/setting"}
                                 active={setting_select}
                                 nonactive={setting_default}
                                 hover={setting_hover}
                  />
                </div>
              </div>
              <div className={"content"}>
                <Route path={"/"} component={HomeContainer} exact={true} />
                <Route path={"/timetable"} component={TimetableContainer} />
                <Route path={"/setting"} render={() => <SettingContainer marginY={"2rem"} />} />
              </div>
            </div>
          }
        </GomataTemplate>
    );
};

export default App;