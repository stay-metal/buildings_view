import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      palette: {
        brand: {
          main: string;
          secondary: string;
          dark: string;
        };
        dark: {
          default: string;
        };
        light: {
          default: string;
        };
        grey: {
          default: string;
        };
        text: {
          light: string;
          dark: string;
          link: string;
        };
      };
      color: {
        backgroundColor: string;
      };
      width: {
        maxContentWidth: number;
        logoWidth: {
          xl: number;
          sm: number;
        };
      };
      spacing: {
        content: {
          xs: number;
          sm: number;
          md: number;
          lg: number;
          xl: number;
        };
      };
    };
  }
  interface ThemeOptions {
    custom: {
      palette: {
        brand: {
          main: string;
          secondary: string;
          dark: string;
        };
        dark: {
          default: string;
        };
        light: {
          default: string;
        };
        grey: {
          default: string;
        };
        text: {
          light: string;
          dark: string;
          link: string;
        };
      };
      color: {
        backgroundColor: string;
      };
      width: {
        maxContentWidth: number;
        logoWidth: {
          xl: number;
          sm: number;
        };
      };
      spacing: {
        content: {
          xs: number;
          sm: number;
          md: number;
          lg: number;
          xl: number;
        };
      };
    };
  }
}
