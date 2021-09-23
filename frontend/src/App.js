import React from 'react';
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
  max-width: 100%;
  max-height: 834px;

  margin-left: auto;
  margin-right: auto;
  // margin-top: 6rem;
  border-radius: 5px;
  overflow: hidden;
  // background: #5c7cfa;

  ul.navbar {
    // background: #22b8cf;
    // color: white;
    // height: 4rem;
    position: sticky;
    top: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
    
    li#Home {
      width: 33.33%;
    }
    li#Timetable {
      width: 33.33%;
    }
    li#Setting {
      flex: 1;
    }
  }

  div.content {
    background: white;
    top: 0;
  }

}
`;


const App = () => {

    return (
        <GomataTemplate>
          <Intro imgSrc={home_cut} />
          <ul className={"navbar"}>
            <li id={"Home"}>
              <NavLinkButton to={"/"}
                             exact={true}
                             active={home_select}
                             nonactive={home_default}
                             hover={home_hover}
              />
            </li>
            <li id={"Timetable"}>
              <NavLinkButton to={"/timetable"}
                             active={schedule_select}
                             nonactive={schedule_default}
                             hover={schedule_hover}
              />
            </li>
            <li id={"Setting"}>
              <NavLinkButton to={"/setting"}
                             active={setting_select}
                             nonactive={setting_default}
                             hover={setting_hover}
              />
            </li>
          </ul>
          <div className={"content"}>
            <Route path={"/"} component={HomeContainer} exact={true} />
            <Route path={"/timetable"} component={TimetableContainer} />
            <Route path={"/setting"} component={SettingContainer} />
          </div>
        </GomataTemplate>
    );
};

export default App;