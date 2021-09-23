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
         alt={"Welcome!"}
         onClick={handleClick}
         style={
           clicked ? ({
             position: 'fixed',
             top: 0,
             maxWidth: 0,
             opacity: "0",
             visibility: "hidden",
             transition: "opacity 1s",
           }) : ({
             position: 'fixed',
             top: 0,
             maxWidth: '500px',
             opacity: "1",
             transition: "opacity 1s , visibility 1s",
           })
         }
    />
  );
};

export default Intro;