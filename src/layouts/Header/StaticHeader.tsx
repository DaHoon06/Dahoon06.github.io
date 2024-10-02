import styled from "styled-components";
import Link from "next/link";
import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HeaderLayout = styled(motion.header)`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid black;
  padding: 0.8em 1em;
  background-color: ${({ theme }) => theme.colors.background.header}; 
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10%;
`;

interface StaticHeaderProps {
  isShow: boolean;
}

export const StaticHeader = ({isShow}: StaticHeaderProps): ReactElement => {
  return (
    <AnimatePresence>
      {!isShow && (
        <HeaderLayout
                      exit={{ y: -100, opacity: 0 }}
                      transition={{ duration: 0.5 }}
        >
          <HeaderContainer>
            <Link href={'/'}>
              Dahoon06
            </Link>
          </HeaderContainer>
        </HeaderLayout>
      )}
    </AnimatePresence>

  );
};
