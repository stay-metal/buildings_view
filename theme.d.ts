import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
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
