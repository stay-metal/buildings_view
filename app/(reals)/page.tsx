"use client";
import { Box, CircularProgress } from "@mui/material";
import Carousel from "@/components/Carousel";
import { useSlider } from "./SliderContext";
import slides from "@/data/slides";
import { useSxAppContext } from "@/app/SxAppContext";
import { ConstructionOutlined } from "@mui/icons-material";

export default function Page() {
  const { mainSliderRef, thumbSliderRef } = useSlider();
  // TODO: Change when adding API data fetch
  const viewsData = [];
  const { data } = useSxAppContext();

  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { views } = data;

  return (
    <>
      <Box maxWidth="100vw" maxHeight="100vh">
        <Carousel mainSliderRef={mainSliderRef} thumbSliderRef={thumbSliderRef}>
          {views.map(({ viewId, image_url: imageUrl, ...view }, id) => (
            <Box height="100vh" key={viewId}>
              <img
                src={imageUrl}
                alt="Slide 2"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
}
