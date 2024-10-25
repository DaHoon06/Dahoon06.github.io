import { ReactElement } from "react";
import styled from "styled-components";

export const SkillsScreenLayout = styled.section`
  width: 100%;
  height: 300px;
  color: #fbfbfb;
  padding: 1em 2em 1em;
  background-color: #2b2b2b;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 1em;
`

export const SkillsScreen = (): ReactElement => {
  return (
    <SkillsScreenLayout>
      <Title>Skills.</Title>
    </SkillsScreenLayout>
  );
};
