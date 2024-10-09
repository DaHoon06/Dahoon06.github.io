import styled from "styled-components";
import React, { forwardRef, Ref } from "react";
import { ArrowButton } from "./ArrowButton";
import { IntroMessageBox } from "@components/intro/IntroMessageBox";
import { StaticHeader } from "@layouts/Header";
import FlexBox from "@components/common/boxes/FlexBox";
import { GitHubIcon, BlogIcon } from "@components/common/icons";
import {} from "@components/common/icons/Blog";

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

  .message-box {
    position: relative;
    padding: 1em 2em;

    @media screen and (max-width: 767px) {
      padding: 0.8em 1.5em;
    }
  }

  .link-lists {
    padding: 1em 2em;
    display: flex;
    gap: 20px;

    @media screen and (max-width: 767px) {
      padding: 0.8em 1.5em;
    }
  }
`;

export const LinkItem = () => {
  return (
    <ul className="link-lists">
      <li>
        <GitHubIcon />
      </li>
      <li>
        <BlogIcon />
      </li>
    </ul>
  );
};

export const IntroScreen = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<object>
>((props, ref: Ref<HTMLDivElement>) => {
  return (
    <IntroScreenLayout ref={ref}>
      <StaticHeader isShow={true} />
      <FlexBox
        $flexDirection="column"
        $alignItems="flex-start"
        className="message-box"
      >
        <IntroMessageBox />
        <LinkItem />
      </FlexBox>
      <ArrowButton />
    </IntroScreenLayout>
  );
});

IntroScreen.displayName = "IntroScreen";
