import { Button } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import { SxHeaderButton } from "@/components/StyledComponents";
import theme from "@/styles/theme";

export default function FullSreen() {
  return (
    <SxHeaderButton
      sx={{
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Fullscreen
        fontSize={"inherit"}
        sx={{
          fontSize: "52px",
          [(theme.breakpoints.down("sm"), theme.breakpoints.down("md"))]: {
            fontSize: "30px",
          },
        }}
      />
    </SxHeaderButton>
  );
}
