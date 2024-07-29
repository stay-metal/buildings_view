import { SxContainer, SxExternalLink } from "../StyledComponents";
import ExternalLink from "../ExternalLink";
import { Box } from "@mui/material";
import {
  SxTextSliderTitle,
  SxTextSliderDescription,
} from "../StyledComponents";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function TextSlide({ view }) {
  return (
    <>
      <SxContainer
        className="text-slide__container_content"
        sx={{
          paddingTop: "110px",
          paddingBottom: "94px",
          paddingLeft: "282px",
          display: "flex",
          alignItems: "center",
          height: "100%",
          zIndex: "2",
        }}
      >
        <MotionBox
          width={"100%"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {view.title && (
            <SxTextSliderTitle
              pb={"50px"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              zIndex={2}
            >
              {view.title}
            </SxTextSliderTitle>
          )}
          {view.description && (
            <SxTextSliderDescription
              maxWidth={"814px"}
              zIndex={2}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: view.description }}
            ></SxTextSliderDescription>
          )}
          {view.link && (
            <Box paddingTop={"28px"}>
              <ExternalLink url={view.link}>
                <SxExternalLink
                  zIndex={2}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  External link
                </SxExternalLink>
              </ExternalLink>
            </Box>
          )}
        </MotionBox>
      </SxContainer>
      {view.backgroundColor && (
        <Box
          className="text-slide__container_bg-color"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            opacity: view.opacity ? view.opacity : 1,
            backgroundColor: view.backgroundColor,
            zIndex: 0,
          }}
        />
      )}
      {view.imageUrl && (
        <Box
          className="text-slide__image"
          component="img"
          src={view.imageUrl}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            opacity: view.opacity ? view.opacity : 0.5,
            zIndex: -2,
          }}
        />
      )}
    </>
  );
}
