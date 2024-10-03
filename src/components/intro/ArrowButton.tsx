import { ReactElement } from "react";
import { styled } from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const ArrowButtonLayout = styled.button`
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10%;
`;

const Arrow = styled.span`
  background: transparent;
  border: none;
  cursor: pointer;
  height: 20px;
  outline: none;
  align-self: center;
  font-size: 2rem;
  color: white;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

export const ArrowButton = (): ReactElement => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <ArrowButtonLayout onClick={scrollToContent} type="button">
      <Arrow>
        <IoIosArrowDown color="white" />
      </Arrow>
      <Arrow>
        <IoIosArrowDown color="white" />
      </Arrow>
    </ArrowButtonLayout>
  );
};
