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

const fadeInTest = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
      <p>{Introduce.hello}</p>
      <TypingText className='typing-text' $startTyping={startTyping}>{Introduce.description}</TypingText>
    </IntroMessageBoxLayout>
  )
}