import { Footer } from "./Footer";
import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { IntroScreen } from "@components/intro/IntroScreen";
import useUtilityStore from "@state/store/utilityStore";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Main = styled.main<{ $isScrolled: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.base};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  transform: ${({ $isScrolled }) =>
    $isScrolled ? "translateY(0)" : "translateY(100vh)"};
  opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0)};
  z-index: 30;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
`;

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { isScrolled, setIsScrolled, setIsVisible } = useUtilityStore();
  const introRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = ({ target }: any) => {
    const scrollTop = target.scrollTop;
    if (scrollTop > 0) {
      setIsScrolled(true);
      if (introRef.current) {
        const contentHegiht = introRef.current.clientHeight;
        setIsVisible(scrollTop > contentHegiht);
      }
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll({ target: document.body });
    document.body.addEventListener("scroll", handleScroll);
    return () => document.body.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <BaseContainer>
        <IntroScreen ref={introRef} />
        <Main $isScrolled={isScrolled}>
          <MainContainer>{children}</MainContainer>
        </Main>
      </BaseContainer>
      <Footer />
    </>
  );
};
