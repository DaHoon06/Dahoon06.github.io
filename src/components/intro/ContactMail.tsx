import {ReactElement} from "react";
import styled from "styled-components";

export const ContactMailLayout = styled.div`
  position: absolute;
  bottom: 0;
  right: 10%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(90deg);
  transform-origin: bottom right;
  color: #B9B9B9;
  font-weight: 400;
  
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const Line = styled.div`
  flex-grow: 0; 
  height: 2px;
  background-color: #B9B9B9;
  margin-left: 10px;
  width: 150px;
  z-index: 999;
`;

const MAIL = 'dahoon226@gmail.com';

export const ContactMail = (): ReactElement => {
  return (
    <ContactMailLayout>
      <a>{MAIL}</a>
      <Line />
    </ContactMailLayout>
  )
}