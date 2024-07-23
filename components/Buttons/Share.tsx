"use client";
import { ScreenShare } from "@mui/icons-material";
import { SxHeaderButton } from "@/components/StyledComponents";
import theme from "@/styles/theme";
// import "./css/ui.css";

export default function Share() {
  return (
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
  );
}
