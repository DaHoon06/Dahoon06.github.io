import { ReactElement } from "react";
import styled from "styled-components";

export const AboutScreenLayout = styled.section`
  width: 100%;
  height: 300px;
  background-color: #232323;
  color: #fbfbfb;
  padding: 1em 0;
`;

export const AboutScreen = (): ReactElement => {
  return (
    <AboutScreenLayout>
      <h1>About.</h1>
      <h2>아뇽하세연</h2>
      <div>
        <p>프론트엔드 개발자 전다훈 입니다.</p>
        <p>롸</p>
      </div>
    </AboutScreenLayout>
  );
};
