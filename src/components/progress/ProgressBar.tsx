import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

export const ProgressBarLayout = styled(motion.header)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 40;
  background-color: #2d2d2dfc;
  display: flex;
  align-items: center;
  padding: 0 1em;
  color: white;
`;

const ProgressLists = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

export const ProgressBar = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <ProgressBarLayout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <ProgressLists>
            <li>About</li>
            <li>Skill</li>
            <li>Project</li>
            <li>Contact</li>
          </ProgressLists>
        </ProgressBarLayout>
      )}
    </AnimatePresence>
  );
};
