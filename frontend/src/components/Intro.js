import React, {useCallback, useState} from 'react';
import {withRouter} from "react-router-dom";
import ImageFadeIn from "react-image-fade-in";


const Intro = props => {

  const { imgSrc } = props;
  const { match, location } = props;

  const [clicked, setClicked] = useState(false);
  const handleClick = useCallback(() => {
    setClicked(!clicked);
  }, []);


  return (
    <img src={imgSrc}
         alt={"Welcome!"}
         onClick={handleClick}
         style={
           clicked ? ({
             position: 'fixed',
             bottom: 0,
             width: 0,
             height: 0,
             opacity: 0,
             visibility: "hidden",
             transition: "opacity 1s",
           }) : ({
             position: 'fixed',
             top: 0,
             width: '100%',
             maxWidth: '500px',
             height: '100%',
             maxHeight: '833px',
             opacity: 1,
             zIndex: 200,
             transition: "opacity 1s , visibility 1s",
           })
         }
    />
  );
};

export default withRouter(Intro);