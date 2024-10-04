import { ProgressBar } from "@components/progress/ProgressBar";
import useUtilityStore from "@state/store/utilityStore";
import { AboutScreen } from "@components/about/AboutScreen";
import {useRef} from "react";

export default function Home() {
  const { isVisible, setScrollTo } = useUtilityStore();
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleButtonClick = (index: number) => {
    setScrollTo(index); // 클릭된 인덱스 설정
  };

  return (
    <>
      <ProgressBar isVisible={isVisible} />
      <div ref={(el: any) => (screenRefs.current[0] = el)}>
        <AboutScreen />
      </div>
    </>
  );
}
