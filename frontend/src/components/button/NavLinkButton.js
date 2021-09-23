import React, {useEffect, useState} from 'react';
import {NavLink, withRouter} from "react-router-dom";


const NavLinkButton = props => {
    const { to, exact = false } = props;
    const { active, nonactive, hover } = props;
    const { match, location } = props;
    const { style } = props;


    const [imgSrc, setImgSrc] = useState(nonactive);
    useEffect(() => {
      setImgSrc((location.pathname === to) ? active : nonactive);
    }, [location.pathname]);


    return (
      <NavLink to={to} activeClassName={"active"} exact>
        <img src={imgSrc}
             alt={`active ${to}`}
             style={{ width: '100%', height: '100%', }}
             onMouseOver={() => {setImgSrc(hover);}}
             onMouseOut={() => {setImgSrc((location.pathname === to) ? active : nonactive);}}
        />
      </NavLink>
    );
};

export default withRouter(NavLinkButton);