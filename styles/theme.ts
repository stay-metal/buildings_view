"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { apiData } from "@/data/slides";

// This property comes from backend and is automatically set as body bgColor
// Othervise body bgColor is set to #FFFFF

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#123456", // Your custom primary color
    },
    secondary: {
      main: "#654321", // Your custom secondary color
    },
    background: {
      default: "#FFF", // Dynamic background color
    },
  },
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
        video: {
          width: "auto!important",
          height: "auto!important",
        },
        a: {
          textDecoration: "none",
        },
        button: {
          outline: "none",
          border: "none",
          cursor: "pointer",
        },
        html: {
          margin: 0,
          padding: 0,
        },
        body: {
          backgroundColor: "#539699",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          // TODO: add beautifull gradient here
          // background:
          //   "linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(9,9,121,0) 81%, rgba(34,34,34,0.2637429971988795) 100%)",
        },
      },
    },
  },
  custom: {
    palette: {
      brand: {
        main: "#C0F3D1",
        secondary: "#D9F8E3",
        dark: "#1F3D4D",
      },
      dark: {
        default: "#16232B",
      },
      light: {
        default: "#16232B",
      },
      grey: {
        default: "#EEEEEE", // Dynamic background color
      },
      text: {
        light: "#FFFFFF",
        dark: "#16232B",
        link: "#C0F3D1",
      },
    },
    color: {
      backgroundColor: "#FFF",
    },
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
