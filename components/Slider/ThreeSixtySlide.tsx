import CubemapViewer from "./CubemapViewer";
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
import ThreeSixtyButton from "../Buttons/ThreeSixtyButton";

const MotionBox = motion(Box);
const MotionDiv = motion.div;

interface ThreeSixtySlideProps {
  view: {
    imageUrl: string;
    backgroundColor?: string;
    opacity?: number;
    title?: string;
    description?: string;
    link?: string;
    linkText?: string;
    linkColor?: string;
    textColor?: string;
  };
}

const ThreeSixtySlide: React.FC<ThreeSixtySlideProps> = ({ view }) => {
  const { thumbsContainerHeight } = useSlider();
  const [heightOffset, setHeightOffset] = useState(0);
  const [isRotation, setIsRotation] = useState(false);
  const defaultHeight = 94;
  const defaultOpacity = 0.7;

  const basicBackgroundColor =
    view.backgroundColor || theme.custom.palette.dark.default;
  const backgroundColor = `rgba(${parseInt(
    basicBackgroundColor.slice(1, 3),
    16
  )}, ${parseInt(basicBackgroundColor.slice(3, 5), 16)}, ${parseInt(
    basicBackgroundColor.slice(5, 7),
    16
  )}, ${view.opacity || defaultOpacity})`;

  useEffect(() => {
    if (thumbsContainerHeight > defaultHeight) {
      setHeightOffset(thumbsContainerHeight - defaultHeight);
    } else {
      setHeightOffset(0);
    }
  }, [thumbsContainerHeight]);

  return (
    <>
      {view.imageUrl && (
        <MotionDiv
          className="360-slide__image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: isRotation ? 0 : 1,
              transition: "0.08s ease",
            }}
          >
            <ThreeSixtyButton />
          </Box>
          <CubemapViewer cubemapPath={view.imageUrl} />
        </MotionDiv>
      )}
      <SxContainer
        className="text-slide__container_content"
        onMouseDown={() => setIsRotation(true)}
        onMouseUp={() => setIsRotation(false)}
        sx={{
          paddingBottom: `${defaultHeight + 48}px`,
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          height: "100%",
          zIndex: 2,
          position: "relative",
          background: "transparent",
          borderRadius: "9px",
          cursor: isRotation ? "grabbing" : "grab",
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
                ? { url: view.link, text: view.linkText, color: view.linkColor }
                : null
            }
          />
        )}
      </SxContainer>
    </>
  );
};

export default ThreeSixtySlide;
