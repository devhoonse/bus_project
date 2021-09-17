import React from 'react';
import {Link, Route} from "react-router-dom";

import Home from "./components/Home";
import Timetable from "./components/Timetable";
import Setting from "./components/Setting";


const App = () => {
    return (
        <div>
          <ul>
            <li><Link to={"/"}>홈</Link></li>
            <li><Link to={"/timetable"} exact={true}>시간표</Link></li>
            <li><Link to={"/setting"}>설정</Link></li>
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