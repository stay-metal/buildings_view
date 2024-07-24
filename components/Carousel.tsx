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

interface CarouselProps {
  children: ReactNode[];
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      aria-label="next-slide"
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "transparent",
        height: "100vh",
        width: "11.11%", // 1/9 of the width
        display: "flex",
        opacity: 0.1,
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
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "transparent",
        height: "100vh",
        width: "11.11%", // 1/9 of the width
        display: "flex",
        borderRadius: "0",
        opacity: 0.1,
        "&:hover": { opacity: 0.8, backgroundColor: "transparent" },
        "&:active": { opacity: 0.8 },
      }}
    >
      <FaChevronLeft />
    </IconButton>
  );
};

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slider = React.useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
  };

  const images = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return child.props.children.props.src;
    }
    return null;
  });

  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative">
      <Slider ref={slider} {...settings}>
        {children}
      </Slider>
      {/* {images && (
        <Thumbnail
          images={images}
          slider={slider.current}
          activeIndex={activeIndex}
        />
      )} */}
    </Box>
  );
};

export default Carousel;
