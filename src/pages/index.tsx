import { ProgressBar } from "@components/progress/ProgressBar";
import useUtilityStore from "@state/store/utilityStore";
import { AboutScreen } from "@components/about/AboutScreen";
import { useRef } from "react";
import styled from "styled-components";
import { SkillsScreen } from "@components/skills/SkillsScreen";
import { ProjectScreen } from "@components/project/ProjectScreen";
import { ContactScreen } from "@components/contact/ContactScreen";

export const ScreenLayout = styled.div`
  width: 100%;
  position: relative;
  background: transparent;
  border: none;
  padding: 0 0 2em;
`;

export const ScreenContainer = styled.div`
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  border-radius: 30px 30px 0 0;
  background: transparent;
`;

export default function Home() {
  const { isVisible, setScrollTo } = useUtilityStore();
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleButtonClick = (index: number) => {
    setScrollTo(index); // 클릭된 인덱스 설정
  };

  return (
    <>
      <ProgressBar isVisible={isVisible} />
      <ScreenLayout ref={(el: any) => (screenRefs.current[0] = el)}>
        <ScreenContainer>
          <AboutScreen />
          <SkillsScreen />
          <ProjectScreen />
          <ContactScreen />
        </ScreenContainer>
      </ScreenLayout>
    </>
  );
}
