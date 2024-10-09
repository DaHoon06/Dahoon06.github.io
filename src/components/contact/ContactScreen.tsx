import { ReactElement } from "react";
import styled from "styled-components";

export const ContactScreenLayout = styled.section`
  width: 100%;
  height: 300px;
  color: #fbfbfb;
  padding: 1em 0;
`;

export const ContactScreen = (): ReactElement => {
  return (
    <ContactScreenLayout>
      <h1>Contact.</h1>
    </ContactScreenLayout>
  );
};
