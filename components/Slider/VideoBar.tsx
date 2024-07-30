import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useSxAppContext } from "@/app/SxAppContext";
import {
  PlayArrowRounded,
  PauseRounded,
  SkipPreviousRounded,
} from "@mui/icons-material"; // Import SkipPreviousRounded

const MotionBox = motion(Box);

interface VideoBarProps {
  heightOffset: number;
  backgroundColor: string;
  textColor: string | null;
  isActive: boolean;
  onPlayPause: () => void;
  progress: number;
  playing: boolean;
  ended: boolean; // Add ended prop
}

export default function VideoBar({
  heightOffset,
  backgroundColor,
  textColor,
  isActive,
  onPlayPause,
  progress,
  playing,
  ended, // Add ended prop
}: VideoBarProps) {
  const { isFullScreen } = useSxAppContext();
  return (
    <MotionBox
      initial={{ marginBottom: 0, opacity: 1 }}
      animate={{
        marginBottom: heightOffset ? heightOffset - 8 + "px" : 0,
        opacity: isFullScreen ? 0 : 1,
      }}
      transition={{ duration: 0.15 }}
      sx={{
        borderRadius: "9px",
        width: "641px",
        background: "transparent",
      }}
    >
      <Box
        sx={{
          backgroundColor: backgroundColor,
          padding: "15px 34px 15px 24px",
          borderRadius: "9px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          {ended ? (
            <SkipPreviousRounded
              sx={{
                fontSize: "50px",
                padding: "0px",
                color: textColor ? textColor : "rgba(248, 248, 248, 0.9)",
                cursor: "pointer",
              }}
              onClick={onPlayPause}
            />
          ) : playing ? (
            <PauseRounded
              sx={{
                fontSize: "50px",
                padding: "0px",
                color: textColor ? textColor : "rgba(248, 248, 248, 0.9)",
                cursor: "pointer",
              }}
              onClick={onPlayPause}
            />
          ) : (
            <PlayArrowRounded
              sx={{
                fontSize: "50px",
                padding: "0px",
                color: textColor ? textColor : "rgba(248, 248, 248, 0.9)",
                cursor: "pointer",
              }}
              onClick={onPlayPause}
            />
          )}
          <Box
            sx={{
              marginTop: "5px",
              display: "block",
              alignItems: "center",
              width: "100%",
              height: "10px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: `${progress}%`,
                height: "4px",
                backgroundColor: textColor
                  ? textColor
                  : "rgba(248, 248, 248, 0.9)",
                transition: "width 0.1s ease-in-out",
              }}
            />
            <Box
              sx={{
                position: "relative",
                marginTop: "-4px",
                width: "100%",
                height: "4px",
                backgroundColor: "rgba(30, 30, 30, 1)",
                transition: "width 0.1s ease-in-out",
                zIndex: "-1",
              }}
            />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}
