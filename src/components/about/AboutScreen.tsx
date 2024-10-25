import { ReactElement } from "react";
import styled from "styled-components";

export const AboutScreenLayout = styled.section`
  width: 100%;
  height: 300px;
  color: #222;
  padding: 4em 2em 1em;
  background-color: #fbfbfb;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 1em;
`

export const AboutScreen = (): ReactElement => {
  return (
    <AboutScreenLayout>
      <Title>About.</Title>
      <h2>아뇽하세연</h2>
      <div>
        <p>프론트엔드 개발자 전다훈 입니다.</p>
        <p>롸</p>
      </div>
    </AboutScreenLayout>
  );
};
