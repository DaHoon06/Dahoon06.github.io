import { ReactElement } from "react";
import { styled } from "styled-components";

const NavigationLayout = styled.header`
  z-index: 10;
  position: absolute;
  right: 10%;
  top: 4%;

  nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      padding: 0.2em;
      border-bottom: 3px solid black;
    }
  }
`;

export const Navigation = (): ReactElement => {
  return (
    <NavigationLayout>
      <nav>
        <ul>
          <li>GitHub.</li>
          <li>Blog.</li>
        </ul>
      </nav>
    </NavigationLayout>
  );
};
