import { SxContainer, SxExternalLink } from "../StyledComponents";
import ExternalLink from "../ExternalLink";
import { Box } from "@mui/material";
import { SxTextSlideTitle, SxTextSlideDescription } from "../StyledComponents";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionDiv = motion.div;

//TODO: Disable animation when change slide. Can achive this with passinf animate to params
export default function TextSlide({ view }) {
  // console.log("view", view);
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
            objectFit: "cover",
            zIndex: 0,
            filter: view.blur ? "blur(" + view.blur + "px)" : "none",
          }}
        >
          <img
            src={view.imageUrl}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </MotionDiv>
      )}
      {view.backgroundColor && (
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
      )}
      <SxContainer
        className="text-slide__container_content"
        sx={{
          paddingTop: "110px",
          paddingBottom: "94px",
          paddingLeft: "282px",
          display: "flex",
          alignItems: "center",
          height: "100%",
          zIndex: 2,
          position: "relative", // Ensure it respects z-index
        }}
      >
        <MotionBox
          width={"100%"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {view.title && (
            <SxTextSlideTitle
              pb={"50px"}
              color={"black"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              sx={{ zIndex: 3 }}
              textColor={view.textColor ? view.textColor : ""}
            >
              {view.title}
            </SxTextSlideTitle>
          )}
          {view.description && (
            <SxTextSlideDescription
              maxWidth={"814px"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              dangerouslySetInnerHTML={{ __html: view.description }}
              sx={{ zIndex: 3 }}
              textColor={view.textColor ? view.textColor : ""}
            />
          )}
          {view.link && view.linkText && (
            <Box paddingTop={"28px"}>
              <ExternalLink
                href={view.link}
                variant={"text"}
                color={view.linkColor ? view.linkColor : ""}
              >
                <SxExternalLink
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  textColor={view.linkColor ? view.linkColor : ""}
                  sx={{ zIndex: 3 }}
                >
                  {view.linkText}
                </SxExternalLink>
              </ExternalLink>
            </Box>
          )}
        </MotionBox>
      </SxContainer>
    </>
  );
}
