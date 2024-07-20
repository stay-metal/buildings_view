import { Box, IconButton, AppBar, Toolbar } from "@mui/material";
import Logo from "@/components/ui/Logo";
import FullSreen from "@/components/ui/FullScreen";
import Share from "@/components/ui/Share";

export function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "transparent", boxShadow: "none", zIndex: 1 }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <FullSreen />
        </IconButton>
        <Box mx="auto">
          <Logo />
        </Box>
        <IconButton edge="end" color="inherit" aria-label="share">
          <Share />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
