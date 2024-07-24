import { SxCircleButton } from "../StyledComponents";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Box } from "@mui/material";

export default function PrevThumbArrow(props: any) {
  const { className, onClick } = props;

  return (
    <Box
      sx={{
        width: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <SxCircleButton className={className} onClick={onClick}>
        <ChevronLeftRoundedIcon fontSize={"inherit"} />
      </SxCircleButton>
    </Box>
  );
}
