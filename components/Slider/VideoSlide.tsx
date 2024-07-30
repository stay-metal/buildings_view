import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";
import { SxContainer } from "../StyledComponents";
import { motion } from "framer-motion";
import { useSlider } from "@/app/(reals)/SliderContext";
import theme from "@/styles/theme";
import SliderCaption from "./SliderCaption";
import VideoBar from "./VideoBar";

const MotionBox = motion(Box);

interface VideoSlideProps {
  view: {
    videoUrl: string;
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

const VideoSlide: React.FC<VideoSlideProps> = ({ view }) => {
  const { thumbsContainerHeight } = useSlider();
  const [heightOffset, setHeightOffset] = useState(0);
  const defaultHeight = 94;
  const defaultOpacity = 0.7;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false); // Add ended state
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
      }
    }, 100); // 100 milliseconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [duration, playing]);

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
    setEnded(false);
  };

  const handleEnded = () => {
    setEnded(true);
    setPlaying(false);
  };

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
      <Box
        className={"video_box"}
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          opacity: "1",
        }}
      >
        <ReactPlayer
          className={"video_player"}
          position={"relative"}
          ref={playerRef}
          url={view.videoUrl}
          playing={playing}
          controls={false} // Disable standard controls
          width="100vw"
          height="100vh"
          onDuration={handleDuration} // Capture duration
          onEnded={handleEnded} // Handle video end
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
          zIndex={1}
        />
      </Box>
      <SxContainer
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
        }}
      >
        <Box
          heightOffset={heightOffset}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <MotionBox
            initial={{ opacity: 1 }}
            animate={{ opacity: playing ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {view.title && (
              <SliderCaption
                title={view.title}
                description={view.description}
                backgroundColor={backgroundColor}
                textColor={view.textColor ? view.textColor : ""}
                link={
                  view.link && view.linkText
                    ? {
                        url: view.link,
                        text: view.linkText,
                        color: view.linkColor,
                      }
                    : null
                }
              />
            )}
          </MotionBox>
          <VideoBar
            heightOffset={heightOffset}
            backgroundColor={backgroundColor}
            textColor={view.textColor ? view.textColor : ""}
            isActive={true} // Assuming this is a prop you need to handle
            onPlayPause={handlePlayPause} // Pass the handler here
            progress={progress} // Pass progress here
            playing={playing} // Pass playing state here
            ended={ended} // Pass ended state here
          />
        </Box>
      </SxContainer>
    </>
  );
};

export default VideoSlide;
