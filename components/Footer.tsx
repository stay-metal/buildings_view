import { Box } from "@mui/material";
import { SxContainer } from "./StyledComponents";
import theme from "@/styles/theme";

export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <SxContainer
      sx={{
        position: "fixed",
        zIndex: "1000",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: `0`,
      }}
    >
      <Box
        sx={{
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </SxContainer>
  );
}
