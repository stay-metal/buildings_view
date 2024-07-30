"use client";
import React from "react";
import { Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import { useSlider } from "@/app/(reals)/SliderContext";
import theme from "@/styles/theme";

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
        color: theme.custom.palette.dark.default,
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          borderRadius: "99999px",
          backgroundColor: "rgba(217, 248, 227, 0.7)",
          border: "1px solid  rgba(217, 248, 227)",
        }}
      >
        <ChevronRightRounded sx={{ fontSize: "45px" }} />
      </Box>
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
        color: theme.custom.palette.brand.dark,
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          borderRadius: "99999px",
          backgroundColor: "rgba(217, 248, 227, 0.7)",
          border: "1px solid  rgba(217, 248, 227)",
        }}
      >
        <ChevronLeftRoundedIcon sx={{ fontSize: "45px" }} />
      </Box>
    </IconButton>
  );
};

interface CarouselProps {
  mainSliderRef: React.MutableRefObject<Slider | null>;
  thumbSliderRef: React.MutableRefObject<Slider | null>;
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const { mainSliderRef, activeSlide, setActiveSlide, setPrevSlide } =
    useSlider();

  const settings = {
    // asNavFor: thumbSliderRef.current || undefined,
    ref: mainSliderRef,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: false,
    beforeChange: (current: any, next: any) => {
      setActiveSlide(next);
      setPrevSlide(current);
    },
  };

  // const images = React.Children.map(children, (child) => {
  //   if (React.isValidElement(child)) {
  //     return child.props.children.props.src;
  //   }
  //   return null;
  // });

  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative">
      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <Box
            sx={{
              height: "100%",
              opacity: index === activeSlide ? 1 : 0,
              transition: "opacity 0.5s ease",
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
