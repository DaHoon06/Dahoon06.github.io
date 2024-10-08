import styled, { keyframes, css  } from "styled-components";
import {useEffect, useState} from "react";
import {Introduce} from "@root/site.config";

const slideToLeft = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%); 
  }
  100% {
    opacity: 1;
    transform: translate(-100%, -50%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const IntroMessageBoxLayout = styled.div<{$isSlid: boolean}>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 30;
  opacity: 1;
  transform: translate(-50%, -50%);

  ${({ $isSlid }) =>
          $isSlid
                  ? css`
          animation: ${slideToLeft} 1s ease forwards;
        `
                  : css`
          animation: ${fadeIn} 1s ease forwards;
        `};
  
  .title {
    stroke: rgba(0,0,0,0.4);
    font-weight: bold;
    font-size: 2.5rem;
    
    .accent {
      color: #FF7101;
    }
  }
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;


const TypingText = styled.p<{$startTyping: boolean}>`
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  animation: ${({ $startTyping }) => $startTyping && css`
    ${typing} 4s steps(30) forwards;
  `};
  
  &.typing-text {
    color: #fff;
    font-weight: 100;
    line-height: 40px;
  }
`;

export const IntroMessageBox = () => {
  const [isSlid, setIsSlid] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSlid(true);
      setStartTyping(true);
    }, 1000);

    const typingTimer = setTimeout(() => {
      setStartTyping(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (isSlid) {
      setTimeout(() => {
        const typingText = document.querySelector('.typing-text') as HTMLElement;
        if (typingText) {
          typingText.style.opacity = '1';
        }
      }, 1000);
    }
  }, [isSlid]);

  return (
    <IntroMessageBoxLayout $isSlid={isSlid}>
      <p className={'title'}>
        안녕하세요. 프론트엔드 엔지니어 <span className={'accent'}>전다훈</span>입니다.
      </p>
      <TypingText className='typing-text' $startTyping={startTyping}>저의 웹 포트폴리오에 방문해주셔서 진심으로 감사드립니다.
        <br/> 저에대해 좀 더 궁금하시다면 스크롤을 내려주세요.
      </TypingText>
    </IntroMessageBoxLayout>
  )
}