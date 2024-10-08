import { ProgressBar } from "@components/progress/ProgressBar";
import useUtilityStore from "@state/store/utilityStore";
import { AboutScreen } from "@components/about/AboutScreen";
import {useRef} from "react";
import styled from "styled-components";

export const ScreenLayout = styled.div`
  width: 100%;
  position: relative;
  background-color: #2d2d2d;
  border-radius: 50px 50px 0 0 ;
  border: 1px solid black;
  box-shadow: 10px 10px 10px rgba(0,0,0,0.4);
  padding: 1em 0;
`;

export const ScreenContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: auto;
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
          <AboutScreen />
          <AboutScreen />
          <AboutScreen />
          <AboutScreen />
          <AboutScreen />
        </ScreenContainer>
      </ScreenLayout>
    </>
  );
}
