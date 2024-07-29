import { useEffect, useState } from "react";
import { ThreeDRotation } from "@mui/icons-material";
import { motion } from "framer-motion";
import { SxCenterButton } from "@/components/StyledComponents";
import theme from "@/styles/theme";

const ThreeSixtyButton = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, x: 5 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ opacity: hasMounted ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <SxCenterButton
          sx={{
            backgroundColor: theme.custom.palette.brand.secondary,
            color: theme.custom.palette.brand.dark,
            opacity: 0.5,
            transition: "0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <ThreeDRotation
            fontSize={"inherit"}
            color={"inherit"}
            sx={{
              fontSize: "45px",
              [(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))]: {
                fontSize: "18px",
              },
            }}
          />
        </SxCenterButton>
      </motion.div>
    </motion.div>
  );
};

export default ThreeSixtyButton;
