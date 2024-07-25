import { Button } from "@mui/material";
import { FullscreenRounded, FullscreenExitRounded } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { SxHeaderButton } from "@/components/StyledComponents";
import theme from "@/styles/theme";
import { useState, useEffect } from "react";

const FullScreen = ({
  onClick,
  isFullScreen,
}: {
  onClick: any;
  isFullScreen: boolean;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <SxHeaderButton
      onClick={onClick}
      sx={{
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <AnimatePresence mode="wait">
        {isFullScreen ? (
          <motion.div
            key="exit"
            initial={{
              opacity: hasMounted ? 0 : 1,
              scale: hasMounted ? 0.9 : 1,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <FullscreenExitRounded
              fontSize={"inherit"}
              sx={{
                fontSize: "52px",
                [(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))]:
                  {
                    fontSize: "30px",
                  },
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="enter"
            initial={{
              opacity: hasMounted ? 0 : 1,
              scale: hasMounted ? 0.9 : 1,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <FullscreenRounded
              fontSize={"inherit"}
              sx={{
                fontSize: "52px",
                [(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))]:
                  {
                    fontSize: "30px",
                  },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SxHeaderButton>
  );
};

export default FullScreen;
