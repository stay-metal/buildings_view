"use client";
import { Box, CircularProgress } from "@mui/material";
import Carousel from "@/components/Carousel";
import { useSlider } from "./SliderContext";
import slides from "@/data/slides";
import { useSxAppContext } from "@/app/SxAppContext";
import { ConstructionOutlined } from "@mui/icons-material";
import Slide from "@/components/Slider/Slide";
import TextSlide from "@/components/Slider/TextSlide";

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
        <CircularProgress />
      </Box>
    );
  }

  const { views } = data;

  const viewsData = views.map((view) => ({
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
    link: view.link,
  }));

  const getSlideComponent = (view: string) => {
    switch (view.assetType) {
      case "text":
        return <TextSlide view={view} />;
      // case 'image':
      //   return <ImageSlide view={view} />;
      // case 'video':
      //   return <VideoSlide view={view} />;
      // case '360':
      //   return <ThreeSixtySlide view={view} />;
      // case 'scrapper':
      //   return <ScrapperSlide view={view} />;
      default:
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
