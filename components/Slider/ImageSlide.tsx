import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { SxContainer, SxCaptionTitle } from "../StyledComponents";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSlider } from "@/app/(reals)/SliderContext";
import theme from "@/styles/theme";
import SliderCaption from "./SliderCaption";

const MotionBox = motion(Box);
const MotionDiv = motion.div;

export default function ImageSlide({ view }) {
  const { thumbsContainerHeight } = useSlider();
  const [heightOffset, setHeightOffset] = useState(0);
  const defaultHeight = 94;
  const defaultBackgroundColor = theme.custom.palette.dark.default;
  const defaultOpacity = 0.7;
  const basicBackgroundColor = view.backgroundColor
    ? view.backgroundColor
    : theme.custom.palette.dark.default;
  const backgroundColor = `rgba(${parseInt(
    basicBackgroundColor.slice(1, 3),
    16
  )}, ${parseInt(basicBackgroundColor.slice(3, 5), 16)}, ${parseInt(
    basicBackgroundColor.slice(5, 7),
    16
  )}, ${view.opacity || defaultOpacity})`;

  const backgroundColor2 = `rgba(${parseInt(
    view.backgroundColor
      ? view.backgroundColor
      : theme.custom.palette.dark.default.slice(1, 3),
    16
  )}, ${parseInt(view.backgroundColor.slice(3, 5), 16)}, ${parseInt(
    view.backgroundColor
      ? view.backgroundColor
      : theme.custom.palette.dark.default.slice(5, 7),
    16
  )}, ${view.opacity || defaultOpacity})`;

  // Get thumbs container height from context
  useEffect(() => {
    if (thumbsContainerHeight > defaultHeight) {
      setHeightOffset(thumbsContainerHeight - defaultHeight);
    } else {
      setHeightOffset(0);
    }
  }, [thumbsContainerHeight]);

  //   console.log("thumbsContainer", thumbsContainer);
  return (
    <>
      {view.imageUrl && (
        <MotionDiv
          className="text-slide__image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            overflow: "hidden", // To ensure the image covers the entire area
          }}
        >
          <img
            src={view.imageUrl}
            alt=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: "translate(-50%, -50%)", // Center the image
            }}
          />
        </MotionDiv>
      )}

      {/* {view.backgroundColor && (
        <MotionBox
          className="text-slide__container_bg-color"
          initial={{ opacity: 0 }}
          animate={{ opacity: view.opacity ? view.opacity : 1 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: view.backgroundColor,
            zIndex: 1,
          }}
        />
      )} */}
      <SxContainer
        className="text-slide__container_content"
        sx={{
          paddingBottom: defaultHeight + 48 + "px",
          //   marginTop: heightOffset + "px",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          height: "100%",
          zIndex: 2,
          position: "relative", // Ensure it respects z-index
          background: "transparent",
          borderRadius: "9px",
        }}
      >
        {view.title && (
          <SliderCaption
            heightOffset={heightOffset}
            title={view.title}
            description={view.description}
            backgroundColor={backgroundColor}
            textColor={view.textColor ? view.textColor : ""}
            link={
              view.link && view.linkText
                ? {
                    url: view.link,
                    text: view.linkText,
                    color: view.linkColor ? view.linkColor : "",
                  }
                : null
            }
          />
        )}
      </SxContainer>
    </>
  );
}
