import { SxSlideContainer } from "../StyledComponents";

export default function Slide({ children }: { children: React.ReactNode }) {
  return <SxSlideContainer>{children}</SxSlideContainer>;
}
