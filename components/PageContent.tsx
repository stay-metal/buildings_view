"use client";
import React, { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { Header } from "@/components/Header";
import FullScreen from "@/components/Buttons/FullScreen";
import Logo from "@/components/ui/Logo";
import Share from "@/components/Buttons/Share";
import Footer from "@/components/Footer";
import { SliderProvider, useSlider } from "@/app/[id]/SliderContext";
import Carousel from "@/components/Carousel";
import Slide from "@/components/Slider/Slide";
import TextSlide from "@/components/Slider/TextSlide";
import ImageSlide from "@/components/Slider/ImageSlide";
import SequanceSlide from "@/components/Slider/SequanceSlide";
import ThreeSixtySlide from "@/components/Slider/ThreeSixtySlide";
import VideoSlide from "@/components/Slider/VideoSlide";
import { apiData } from "@/data/slides";
import { SxAppProvider, useSxAppContext } from "@/app/SxAppContext";

const Thumbnails = React.lazy(() => import("@/components/Slider/Thumbnails"));

const PageContent: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { mainSliderRef, thumbSliderRef } = useSlider();
  const { isFullScreen, setIsFullScreen } = useSxAppContext(); // Get isFullScreen from SxAppProvider
  const [data, setData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    if (!id) return;
    setData(apiData);
    // const fetchData = async () => {
    //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    //   const targetUrl = `http://51.17.218.57:8000/api/real/${id}/`;

    //   try {
    //     const response = await fetch(proxyUrl + targetUrl, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     });
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const result = await response.json();

    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
  }, [id]);

  // Timer to show loading spinner for a minimum amount of time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThumbnails(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev); // Toggle visibility
  };

  function handleFullScreenClick() {
    setIsFullScreen(!isFullScreen);
  }

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
        return <div>Unknown viewAssetType</div>;
    }
  };

  return (
    <>
      <Header>
        <FullScreen
          onClick={handleFullScreenClick}
          isFullScreen={isFullScreen}
          isVisible={isVisible}
        />
        <Logo />
        <Share isFullScreen={isFullScreen} />
      </Header>
      <Box maxWidth="100vw" maxHeight="100vh">
        <Carousel mainSliderRef={mainSliderRef} thumbSliderRef={thumbSliderRef}>
          {viewsData.map((viewData) => (
            <Slide key={viewData.viewId}>{getSlideComponent(viewData)}</Slide>
          ))}
        </Carousel>
      </Box>
      <Footer>
        <Suspense fallback={<CircularProgress sx={{ color: "#C0F3D1" }} />}>
          {showThumbnails && <Thumbnails isFullScreen={isFullScreen} />}
        </Suspense>
      </Footer>
    </>
  );
};

const PageWrapper: React.FC = () => {
  return (
    <SxAppProvider>
      <SliderProvider>
        <PageContent />
      </SliderProvider>
    </SxAppProvider>
  );
};

export default PageWrapper;
