import theme from "@/styles/theme";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        component="img"
        sx={{
          width: theme.custom.width.logoWidth.xl + "px",
          height: "auto",
          [(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))]: {
            width: theme.custom.width.logoWidth.sm + "px",
          },
        }}
        alt="The house from the offer."
        src="/logo.svg"
      />
    </motion.div>
  );
}
