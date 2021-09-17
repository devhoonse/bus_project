import React from 'react';
import {NavLink, Route} from "react-router-dom";

import Home from "./components/Home";
import Timetable from "./components/Timetable";
import Setting from "./components/Setting";


const activeStyle = {
    background: 'black',
    color: 'white',
};


const App = () => {

    return (
        <div>
          <ul>
            <li><NavLink to={"/"} activeStyle={activeStyle} exact>홈</NavLink></li>
            <li><NavLink to={"/timetable"}  activeStyle={activeStyle}>시간표</NavLink></li>
            <li><NavLink to={"/setting"} activeStyle={activeStyle}>설정</NavLink></li>
          </ul>
          <hr />
          <div>
            <Route path={"/"} component={Home} exact={true} />
            <Route path={"/timetable"} component={Timetable} />
            <Route path={"/setting"} component={Setting} />
          </div>
        </div>
    );
};

export default App;