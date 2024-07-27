import { styled } from "@mui/material/styles";
import theme from "@/styles/theme";
import { Button, AppBar } from "@mui/material";

// Content witdth and paddings
export const SxContainer = styled("div")(
  ({ theme }) => `
    max-width: ${theme.custom.width.maxContentWidth}px;
    width: 100%;
    padding: ${theme.custom.spacing.content.xl}px;
    margin: 0 auto;
    ${theme.breakpoints.down("xl")} {
      max-width: 100%;
    }
    ${(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))} {
      max-width: 100%;
      padding: ${theme.custom.spacing.content.sm}px;
    }
`
);

// Header buttons style
export const SxHeaderButton = styled("button")(
  ({ theme }) => `
      width: 50px;
      height: 50px;
      max-width: 50px;
      max-height: 50px;
      display:flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 8px;
      background-color: #F8F8F8;
      color: #1E1E1E;
    ${(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))} {
        width: 30px;
        height: 30px;
        padding: 5px;
        border-radius: 8px;
    }
`
);

// Circle Button
export const SxCircleButton = styled("button")(
  ({ theme }) => `
      width: 35px;
      height: 35px;
      display:flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      background: rgba(30, 30, 30, 0.30);
      color: #1E1E1E;
      font-size: 25px;
      transition: 0.2s;
      color: #F8F8F8;
            &:hover {
        background: rgba(30, 30, 30, 0.50);
        transform: scale(1.15)
      }
            &:focus {
        border: none;
        transform: none
      }
            &:active {
        border: none;
        transform: none
      }
    ${(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))} {
        width: 25px;
        height: 25px;
        font-size: 19px;
    }
`
);

/* Reals Slider Component */

/* Thumbnails slider */
export const SxThumbnailsWrapper = styled("div")(
  ({ theme }) => `
        display: "flex",
        gap: "25px",
        justify-content: "space-between",
        align-items: "center",
        margin-left: "auto",
        margin-right: "auto",
        transition: "0.2s ease",
        ${theme.breakpoints.down("sm")} {
          gap: "10px",
        }
`
);
