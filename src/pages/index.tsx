import { IntroduceScreen } from "@components/profile/IntroduceScreen";
import { ProgressBar } from "@components/progress/ProgressBar";
import useUtilityStore from "@state/store/utilityStore";

export default function Home() {
  const { isVisible } = useUtilityStore();

  return (
    <>
      <ProgressBar isVisible={isVisible} />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
      <IntroduceScreen />
    </>
  );
}
