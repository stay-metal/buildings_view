import { useEffect, useState } from "react";
import { ScreenShare } from "@mui/icons-material";
import { motion } from "framer-motion";
import { SxHeaderButton } from "@/components/StyledComponents";
import theme from "@/styles/theme";

const Share = ({ isFullScreen }: { isFullScreen: boolean }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: hasMounted ? 0 : 1 }}
      animate={{ opacity: isFullScreen ? 0 : 1 }}
      transition={{ duration: 0.15 }}
    >
      <SxHeaderButton
        sx={{
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <ScreenShare
          fontSize={"inherit"}
          color={"inherit"}
          sx={{
            fontSize: "30px",
            [(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))]: {
              fontSize: "18px",
            },
          }}
        />
      </SxHeaderButton>
    </motion.div>
  );
};

export default Share;
