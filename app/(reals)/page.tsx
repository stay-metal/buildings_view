"use client";
import { Box, CircularProgress } from "@mui/material";
import Carousel from "@/components/Carousel";
import { useSlider } from "./SliderContext";
import { useSxAppContext } from "@/app/SxAppContext";
import Slide from "@/components/Slider/Slide";
import TextSlide from "@/components/Slider/TextSlide";
import ImageSlide from "@/components/Slider/ImageSlide";
import SequanceSlide from "@/components/Slider/SequanceSlide";
import ThreeSixtySlide from "@/components/Slider/ThreeSixtySlide";
import VideoSlide from "@/components/Slider/VideoSlide";

export default function Page() {
  const { mainSliderRef, thumbSliderRef } = useSlider();
  // TODO: Change when adding API data fetch
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
        <CircularProgress sx={{ color: "#C0F3D1" }} />
      </Box>
    );
  }

  const { views } = data;

  const viewsData = views.map((view: any) => ({
    viewId: view.id,
    assetType: view.asset_type,
    fitToPage: view.fit_to_page,
    backgroundColor: view.background_color,
    opacity: view.opacity,
    blur: view.blur,
    textColor: view.text_color,
    title: view.title,
    description: view.description,
    thumbUrl: view.thumb_url,
    imageUrl: view.image_url,
    videoUrl: view.video_url,
    link: view.link,
    linkText: view.link_text,
    linkColor: view.link_color,
  }));

  const getSlideComponent = (view: any) => {
    switch (view.assetType) {
      case "text":
        return <TextSlide view={view} />;
      case "image":
        return <ImageSlide view={view} />;
      case "360":
        return <ThreeSixtySlide view={view} />;
      case "video":
        return <VideoSlide view={view} />;
      case "sequance":
        return <SequanceSlide view={view} />;
      default:
        // TODO: Make 404 like asset
        return <div>Unknown viewAssetType</div>;
    }
  };
  return (
    <>
      <Box maxWidth="100vw" maxHeight="100vh">
        <Carousel mainSliderRef={mainSliderRef} thumbSliderRef={thumbSliderRef}>
          {viewsData.map((viewData, id) => (
            <Slide key={viewData.viewId}>{getSlideComponent(viewData)}</Slide>
            // <Box height="100vh" key={viewId}>
            //   <img
            //     src={imageUrl}
            //     alt="Slide 2"
            //     style={{ width: "100%", height: "100%", objectFit: "cover" }}
            //   />
            // </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
}
