import React, { useState, useEffect, useRef } from "react";
import { Box, GlobalStyles } from "@mui/material";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import { useSlider } from "@/app/(reals)/SliderContext";
import theme from "@/styles/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useSxAppContext } from "@/app/SxAppContext";
import PrevThumbArrow from "./PrevThumbArrow";
import NextThumbArrow from "./NextThumbArrow";

// TODO: Fix width of the  thumbs container
// TODO: Add Suspense
// TODO: Fix reaction time and behaviour on click and tap on thumbnail
export default function Thumbnails({
  isFullScreen,
}: {
  isFullScreen: boolean;
}) {
  // Define how much slides to show on different screens
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const slidesToShow = isMobile ? 3 : 5;
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);

  // Use the ResizeObserver hook
  // useResizeObserver((entry) => {
  //   setThumbsContainerHeight(entry.contentRect.height);
  //   console.log("Thumbs container height:", thumbsContainerHeight);
  // }, thumbsContainerRef);

  // TODO: Change when adding API data fetch
  const { data } = useSxAppContext(); // get Data from API
  const { views } = data; // get all slides
  const hoverScale = 1.2;

  // Slider proprs for sync with main slider
  const {
    mainSliderRef,
    thumbSliderRef,
    activeSlide,
    setActiveSlide,
    prevSlide,
    setPrevSlide,
    thumbsContainerHeight,
    setThumbsContainerHeight,
  } = useSlider();

  const [isContainerHovered, setIsContainerHovered] = useState(false); // To catch Thumb Container hover event
  const [isHovered, setIsHovered] = useState(false); // To catch Thumb hover event
  const [hoveredThumb, setHoveredThumb] = useState(-1); // To catch hoverd Thumb Id

  // Caclulate Thumbs Container Height and pass it to variable
  useEffect(() => {
    if (isContainerHovered) {
      setThumbsContainerHeight(
        thumbsContainerRef.current?.clientHeight * hoverScale
      );
    } else {
      setThumbsContainerHeight(thumbsContainerRef.current?.clientHeight);
    }
  }, [isContainerHovered]);

  // Effect to trigger scroll event when user is on first/last thumb in a row
  useEffect(() => {
    // Get all visable thumbs in a row
    const visibleDivs = document.querySelectorAll(
      'div[data-index][aria-hidden="false"]'
    );
    // Make an array of visible items
    const dataIndexArray = Array.from(visibleDivs)
      .map((div) => div.getAttribute("data-index"))
      .filter((dataIndex): dataIndex is string => dataIndex !== null)
      .map((dataIndex) => parseInt(dataIndex, 10));

    if (dataIndexArray.length > slidesToShow) {
      // If there is several rows of slides
      if (activeSlide >= dataIndexArray[dataIndexArray.length - 1]) {
        thumbSliderRef.current.slickGoTo(activeSlide); // Scroll slides when user points to last thumb in a row
      } else if (activeSlide === dataIndexArray[1] && prevSlide > activeSlide) {
        thumbSliderRef.current.slickGoTo(activeSlide - slidesToShow); // Scroll when user points to first thumb in a row if previously slide has bigger id
      } else if (activeSlide < dataIndexArray[1] && prevSlide > activeSlide) {
        thumbSliderRef.current.slickGoTo(activeSlide - slidesToShow); // Catch event if somehow slide id is less than slides in a row
      }
    }
  }, [activeSlide, prevSlide, slidesToShow, thumbSliderRef]);

  // Trigger slider goto when on click to thumb
  const handleThumbnailClick = (index: number) => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
    }
    setActiveSlide(index);
    setPrevSlide(activeSlide);
  };

  // Slider next button
  const next = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(activeSlide + 1);
    }
  };

  // Slider prev button
  const prev = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(activeSlide - 1);
    }
  };

  // Slider settings
  const sliderSettings = {
    asNavFor: mainSliderRef.current || undefined,
    ref: thumbSliderRef,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
    beforeChange: (current, next) => {
      setPrevSlide(current);
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <GlobalStyles
        styles={{
          ".sx-thumbnails__container *:focus-visible": {
            outline: "none",
          },
        }}
      />
      {/* Thumbs Slider Wrapper styles */}
      <Box
        className="sx-thumbnails__container"
        ref={thumbsContainerRef}
        sx={{
          display: "flex",
          gap: "25px",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          transition: "0.2s ease",
          "&:hover": {
            transform: "scale(" + hoverScale + ")",
          },
          [(theme.breakpoints.down("sm"),
          theme.breakpoints.down("md"),
          theme.breakpoints.down("lg"))]: {
            "&:hover": {
              transform: "scale(1)",
            },
          },
          [theme.breakpoints.down("sm")]: {
            gap: "10px",
          },
          opacity: !isFullScreen ? "1" : "0",
        }}
        onMouseEnter={() => {
          setIsContainerHovered(true);
        }}
        onMouseLeave={() => {
          setIsContainerHovered(false);
        }}
      >
        {/* Thumbs Slider Nav Button */}
        <PrevThumbArrow onClick={prev} />
        {/* Thumbs Slider Container */}
        <Box
          sx={{
            display: "inline-block",
            width: "521px",
            alignItems: "center",
            transition: "transform 0.3s ease",
            [theme.breakpoints.down("md")]: {
              width: "326px",
            },
            [theme.breakpoints.down("sm")]: {
              width: "226px",
            },
          }}
        >
          {/* Thumbs Slider Component */}
          <Slider {...sliderSettings} className="sx-thumbnails__container">
            {/* Thumbs Slider Items Lsit */}
            {views.map(
              ({ id, thumb_url: thumbUrl, asset_type: assetType }, index) => (
                <Box
                  key={id}
                  onClick={() => handleThumbnailClick(index)}
                  sx={{
                    borderRadius: "8px",
                    padding: "2px",
                    transition: "transform 0.3s ease",
                    transform: isHovered ? "scale(0.98)" : "none",
                    // border: index === activeSlide ? "2px solid red" : "none",
                  }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setHoveredThumb(id);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setHoveredThumb(-1);
                  }}
                >
                  {/* <Box sx={{ position: "absolute" }}>{id}</Box> */}
                  <Box position="relative">
                    <Box
                      component="img"
                      src={
                        thumbUrl
                          ? thumbUrl
                          : assetType === "text"
                          ? "/TextThumb.svg"
                          : assetType === "image"
                          ? "/ImageThumb.svg"
                          : assetType === "360"
                          ? "/360Thumb.svg"
                          : assetType === "sequance"
                          ? "/SequanceThumb.svg"
                          : assetType === "video"
                          ? "/VideoThumb.svg"
                          : ""
                      }
                      sx={{
                        objectFit: "cover",
                        cursor: "pointer",
                        transition: "0.2s ease",
                        borderRadius: "8px",
                        opacity: index === activeSlide ? "1" : "0.6",
                        scale: index === activeSlide ? "1.03" : "1",
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))", // Adjust gradient colors as needed
                        transform:
                          isHovered && hoveredThumb !== id
                            ? "scale(0.98)"
                            : "none",
                        "&:hover": {
                          transform: "scale(1.07)",
                          width: "120%",
                          boxShadow: "0px 0px 6px #00000040",
                          zIndex: "100000",
                          opacity: "1",
                        },
                        "&:active": {
                          border: "none",
                          transform: "none",
                        },
                        "&:focus": {
                          border: "none",
                          transform: "none",
                        },
                      }}
                      className="sx-thumbnails__item"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "99%",
                        height: "99%",
                        backgroundColor:
                          index !== activeSlide ? "grey" : "transparent",
                        borderRadius: "8px",
                        zIndex: index !== activeSlide ? "-1" : "-1",
                      }}
                    />
                  </Box>
                </Box>
              )
            )}
          </Slider>
        </Box>
        {/* Thumbs Slider Nav Button */}
        <NextThumbArrow onClick={next} />
      </Box>
    </motion.div>
  );
}
