export interface MediaQueryTheme {
  custom: (width: number) => string;
  mobile: string;
  tablet: string;
  pc: string;
}

const customMediaQuery = (maxWidth: number): string =>
  `@media screen and (max-width: ${maxWidth}px)`;

export const media: MediaQueryTheme = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(1000),
  mobile: customMediaQuery(576),
};

export const scroll = {
  theme: () => `
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 8px;
        border: 1px solid #f1f1f1;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

    @media screen and (max-width: 769px) {
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  `,
};

