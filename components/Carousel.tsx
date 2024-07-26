"use client";
import React, { ReactNode, useState } from "react";
import { Box, IconButton, Grid, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useSlider } from "@/app/(reals)/SliderContext";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      aria-label="next-slide"
      onClick={onClick}
      disableRipple
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        transition: "0.2s ease",
        backgroundColor: "transparent",
        height: "100vh",
        width: "11.11%", // 1/9 of the width
        display: "flex",
        opacity: 0,
        "&:hover": { opacity: 0.8, backgroundColor: "transparent" },
        "&:active": { opacity: 0.8 },
      }}
    >
      <FaChevronRight />
    </IconButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      aria-label="prev-slide"
      onClick={onClick}
      disableRipple
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        transition: "0.2s ease",
        zIndex: 1,
        backgroundColor: "transparent",
        height: "100vh",
        width: "11.11%", // 1/9 of the width
        display: "flex",
        borderRadius: "0",
        opacity: 0,
        "&:hover": { opacity: 0.8, backgroundColor: "transparent" },
        "&:active": { opacity: 0.8 },
      }}
    >
      <FaChevronLeft />
    </IconButton>
  );
};

interface CarouselProps {
  mainSliderRef: React.MutableRefObject<Slider | null>;
  thumbSliderRef: React.MutableRefObject<Slider | null>;
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const {
    mainSliderRef,
    thumbSliderRef,
    activeSlide,
    setActiveSlide,
    prevSlide,
    setPrevSlide,
  } = useSlider();

  const settings = {
    // asNavFor: thumbSliderRef.current || undefined,
    ref: mainSliderRef,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setPrevSlide(current);
    },
  };

  const images = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return child.props.children.props.src;
    }
    return null;
  });

  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative">
      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <Box
            sx={{
              border: index === activeSlide ? "2px solid red" : "none",
              height: "100%",
            }}
          >
            {child}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
