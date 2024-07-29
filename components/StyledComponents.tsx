import { styled } from "@mui/material/styles";
import { Typography, Box, Accordion } from "@mui/material";
import { motion } from "framer-motion";

// Content witdth and paddings
export const SxContainer = styled(Box)(({ theme }) => ({
  maxWidth: theme.custom.width.maxContentWidth + "px",
  width: "100%",
  padding: theme.custom.spacing.content.xl + "px",
  margin: " 0 auto",
  fontWeight: "700",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    padding: theme.custom.spacing.content.sm + "px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    padding: theme.custom.spacing.content.sm + "px",
  },
}));

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
      background: rgba(22, 35, 43, 0.70);
      color: #1E1E1E;
      font-size: 25px;
      transition: 0.2s;
      color: #F8F8F8;
            &:hover {
        background: rgba(22, 35, 43, 0.90);
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

/* Main Slider */

/* Caption */
export const SxCaptionAccordion = styled(Accordion)({
  "& .MuiAccordionSummary-content": {
    margin: "0px",
  },
});

export const SxCaptionTitle = styled(Typography)(
  ({ theme }, textColor = "") => ({
    color: textColor ? textColor : theme.custom.palette.text.light,
    fontSize: 31.38,
    fontWeight: "700",
  })
);

export const SxCaptionDescription = styled(Typography)(
  ({ theme }, textColor = "") => ({
    color: textColor ? textColor : theme.custom.palette.text.light,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: "140%",
  })
);

/* Slide Container */
export const SxSlideContainer = styled("div")(
  ({ theme }) => `
    height: 100vh;
    width: 100%;
    margin: 0 auto;
`
);

/* Text Slide */

export const SxTextSlideTitle = styled(Typography)(
  ({ theme }, textColor = "") => ({
    color: textColor ? textColor : theme.custom.palette.text.light,
    fontSize: 48,
    fontFamily: "Roboto",
    fontWeight: "700",
  })
);

export const SxTextSlideDescription = styled(Typography)(
  ({ theme }, textColor = "") => ({
    color: textColor ? textColor : theme.custom.palette.text.light,
    fontSize: 29,
    fontWeight: "400",
  })
);

interface SxExternalLinkProps {
  textColor?: string;
}

export const SxExternalLink = styled(Typography)<SxExternalLinkProps>(
  ({ theme, textColor }) => ({
    color: textColor ? textColor : theme.custom.palette.text.link,
    fontSize: 24,
    fontWeight: "400",
  })
);

// Animation

export const LinkUnderline = styled(motion.div)`
  position: relaitve;
  left: 0;
  bottom: 4px;
  height: 3px;
  background-color: currentColor;
  width: 100%;
  transform-origin: right;
`;

export const LinkUnderlineMotionTypography = styled(motion(Typography))`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
