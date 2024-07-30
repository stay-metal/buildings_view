import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  SxCaptionTitle,
  SxCaptionDescription,
  SxCaptionAccordion,
  SxExternalLink,
} from "../StyledComponents";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSxAppContext } from "@/app/SxAppContext";
import ExternalLink from "../ExternalLink";

const MotionBox = motion(Box);
const MotionChevronLeftRounded = motion(ChevronLeftRounded);

interface SliderCaptionProps {
  heightOffset: number;
  backgroundColor: string;
  title: string;
  description: string;
  textColor: string | null;
  link: { url: string; text: string; color: string } | null;
}

export default function SliderCaption({
  heightOffset,
  backgroundColor,
  title,
  description,
  textColor,
  link,
}: SliderCaptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFullScreen } = useSxAppContext();
  return (
    <MotionBox
      initial={{ marginBottom: 0, opacity: 1 }}
      animate={{
        marginBottom: heightOffset ? heightOffset - 8 + "px" : 0,
        opacity: isFullScreen ? 0 : 1,
      }}
      transition={{ duration: 0.15 }} // Adjust the duration as needed
      sx={{
        borderRadius: "9px",
        width: "641px",
        background: "transparent",
      }}
    >
      <SxCaptionAccordion
        sx={{
          paddingTop: "22px",
          paddingBottom: "22px",
          paddingLeft: "64px",
          paddingRight: "64px",
          borderRadius: "9px!important",
          backgroundColor: backgroundColor,
          boxShadow: "none!important",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          expandIcon={
            <MotionChevronLeftRounded
              animate={{
                // scale: isHovered ? 1.1 : 1,
                rotate: 90,
                // translateY: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              sx={{
                color: textColor ? textColor : "#fff",
                fontSize: "36px", // Initial size of the icon
              }}
            />
          }
          sx={{ borderRadius: "9px", padding: "0px" }}
        >
          <SxCaptionTitle textColor={textColor ? textColor : ""}>
            {" "}
            {title && title}
          </SxCaptionTitle>
        </AccordionSummary>
        <SxCaptionDescription
          textColor={textColor ? textColor : ""}
          sx={{ marginTop: "10px", paddingBottom: "10px" }}
        >
          {description && (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
          {link && (
            <Box
              sx={{
                marginTop: "40px",
              }}
            >
              <ExternalLink
                href={link.url}
                variant={"caption"}
                color={link.color}
              >
                <SxExternalLink
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  textColor={link.color ? link.color : ""}
                  sx={{ fontSize: "20px" }}
                >
                  {link.text}
                </SxExternalLink>
              </ExternalLink>
            </Box>
          )}
        </SxCaptionDescription>
      </SxCaptionAccordion>
    </MotionBox>
  );
}
