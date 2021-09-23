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
             'max-width': 0,
             opacity: 0,
             visibility: "none",
             transition: "opacity 1s , visibility 1s , max-width 1s",
           }) : ({
             position: 'fixed',
             'max-width': '500px',
             opacity: 1,
             transition: "opacity 1s",
           })
         }
    />
  );
};

export default Intro;