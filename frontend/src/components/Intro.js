import React, {useCallback, useState} from 'react';
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import ImageFadeIn from "react-image-fade-in";


const IntroBlock = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  maxWidth: 500px;
  height: ${props => props.clicked ? '0' : '100%'};
  maxHeight: 833px;
  // zIndex: 500;
  
  img {
    // position: fixed;
    bottom: 0;
    width: 100%;
    // maxWidth: 500px;
    height: 100%;
    // maxHeight: 833px;
    opacity: 1;
    transition: opacity 1s , visibility 1s;
  }
  
  div.button-container {
    position: absolute;
    width: 100%;
    overflow: hidden;
    z-index: 400;
    top: 75%;
    
    button {
      margin-left: auto;
      margin-right: auto;
      border-radius: 5px;
      height: 4rem;
    
      // width: 10rem;
      background: none;
      outline: none;
      border: none;
      background: #868e96;
      color: white;
      // padding-left: 1rem;
      // padding-right: 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 2rem;
      font-family: Goyang;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s background ease-in;
      
      &:hover {
        background: #adb5bd;
      }
    }
  }
}
`;


const Intro = props => {

  const { imgSrc, clicked, handleClick } = props;
  const { match, location } = props;

  // const [clicked, setClicked] = useState(false);
  // const handleClick = useCallback(() => {
  //   setClicked(!clicked);
  // }, []);


  return (
    <IntroBlock clicked={clicked}>
      <img src={imgSrc}
        alt={"Welcome!"}
      />
      <div className={"button-container"}>
        <button onClick={handleClick}>
          시작하기
        </button>
      </div>
    </IntroBlock>
  );
};

export default withRouter(Intro);