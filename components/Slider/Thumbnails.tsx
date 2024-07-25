import { Box } from "@mui/material";

import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { useSlider } from "@/app/(reals)/SliderContext";
import theme from "@/styles/theme";
import slides from "@/data/slides";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "@/styles/css/thumbnail_slider.css";

import PrevThumbArrow from "./PrevThumbArrow";
import NextThumbArrow from "./NextThumbArrow";

export function Thumbnails({ isFullScreen }: { isFullScreen: boolean }) {
  const data = slides;

  const { mainSliderRef, thumbSliderRef, activeSlide, setActiveSlide } =
    useSlider();

  const next = () => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      mainSliderRef.current.slickNext();
      thumbSliderRef.current.slickNext();
    }
  };

  const prev = () => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      mainSliderRef.current.slickPrev();
      thumbSliderRef.current.slickPrev();
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [hoverdThumb, setHoverdThumb] = useState(-1);

  // Get all images from data file

  const thumbDetails = data.map(({ id, thumbUrl: url }) => ({ id, url }));

  const handleThumbnailClick = (index: number) => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
    }
    setActiveSlide(index);
  };

  var settings = {
    asNavFor: mainSliderRef.current || undefined,
    ref: thumbSliderRef,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    swipeToSlide: true,
    touchThreshold: 10,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1200, // Breakpoint for large screens
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 900, // Breakpoint for medium screens
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        transition: "0.2s ease",
        "&:hover": {
          transform: "scale(1.15)",
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
    >
      <PrevThumbArrow onClick={prev} />
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
        <Slider {...settings} className="sx-thumbnails__container">
          {thumbDetails.map((thumb, index) => (
            <Box
              key={thumb.id}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                padding: "2px",
                transition: "transform 0.3s ease",
                transform: isHovered ? "scale(0.98)" : "none",
                border: index === activeSlide ? "2px solid red" : "none",
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setHoverdThumb(thumb.id);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoverdThumb(-1);
              }}
            >
              <Box sx={{ position: "absolute" }}>{thumb.id}</Box>
              <Box
                component="img"
                src={thumb.url}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  borderRadius: "6px",
                  transform:
                    isHovered && hoverdThumb != thumb.id
                      ? "scale(0.98)"
                      : "none",

                  "&:hover": {
                    transform: "scale(1.07)",
                    width: "120%",
                    boxShadow: "0px 0px 6px #00000040",
                    zIndex: "100000",
                  },
                  "&:active": {
                    border: "none", // Ensure no border on active
                    transform: "none", // Ensure no transform on active
                  },
                  "&:focus": {
                    border: "none", // Ensure no border on focus
                    transform: "none", // Ensure no transform on focus
                  },
                }}
                className="sx-thumbnails__item"
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <NextThumbArrow onClick={next} />
    </Box>
  );
}
