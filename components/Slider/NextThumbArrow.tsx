import { SxCircleButton } from "../StyledComponents";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box } from "@mui/material";

export default function NextThumbArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <Box
      sx={{
        width: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <SxCircleButton className={className} onClick={onClick}>
        <ChevronRightRoundedIcon fontSize={"inherit"} />
      </SxCircleButton>
    </Box>
  );
}
