import theme from "@/styles/theme";
import { Box } from "@mui/material";
export default function Logo() {
  return (
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
  );
}
