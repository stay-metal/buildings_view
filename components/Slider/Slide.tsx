import { Box } from "@mui/material";
import { SxSlideContainer } from "../StyledComponents";
import { useSlider } from "@/app/(reals)/SliderContext";

export default function Slide({ children }: { children: React.ReactNode }) {
  return <SxSlideContainer>{children}</SxSlideContainer>;
}
