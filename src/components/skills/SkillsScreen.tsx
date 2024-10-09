import { ReactElement } from "react";
import styled from "styled-components";

export const SkillsScreenLayout = styled.section`
  width: 100%;
  height: 300px;
  color: #fbfbfb;
  padding: 1em 0;
`;

export const SkillsScreen = (): ReactElement => {
  return (
    <SkillsScreenLayout>
      <h1>Skills.</h1>
    </SkillsScreenLayout>
  );
};
