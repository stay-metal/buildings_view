"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
  custom: {
    width: {
      maxContentWidth: 1440,
      logoWidth: {
        xl: 252,
        sm: 130,
      },
    },
    spacing: {
      content: {
        xs: 15,
        sm: 15,
        md: 30,
        lg: 30,
        xl: 30,
      },
    },
  },
});

export default theme;
