import styled from "styled-components";
import { Background } from "./Background";
import { Navigation } from "./Navigation";
import { forwardRef, ReactElement, Ref } from "react";
import { ArrowButton } from "./ArrowButton";

const IntroScreenLayout = styled.article`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9;
  min-width: 100vw;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const IntroScreen = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<object>
>((props, ref: Ref<HTMLDivElement>) => {
  return (
    <IntroScreenLayout ref={ref}>
      <Background />
      <Navigation />
      <ArrowButton />
    </IntroScreenLayout>
  );
});

IntroScreen.displayName = "IntroScreen";
