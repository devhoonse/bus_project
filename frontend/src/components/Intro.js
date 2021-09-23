import React, {useCallback, useState} from 'react';
import ImageFadeIn from "react-image-fade-in";


const Intro = props => {

  const { imgSrc } = props;

  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    setClicked(!clicked);
  }, []);





  return (
    <img src={imgSrc}
         onClick={handleClick}
         style={
           clicked ? ({
             position: 'fixed',
             top: 0,
             width: '450px',
             opacity: 0,
             visibility: "none",
             transition: "opacity 1s , visibility 1s",
           }) : ({
             position: 'fixed',
             top: 0,
             width: '450px',
             opacity: 1,
             transition: "opacity 1s",
           })
         }
    />
  );
};

export default Intro;