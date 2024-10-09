import { ReactElement } from "react";
import { styled } from "styled-components";

export const ProjectScreenLayout = styled.section`
  width: 100%;
  height: 300px;
  color: #fbfbfb;
  padding: 1em 0;
`;

export const ProjectScreen = (): ReactElement => {
  return (
    <ProjectScreenLayout>
      <h1>Project.</h1>
    </ProjectScreenLayout>
  );
};
