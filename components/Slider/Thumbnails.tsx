import { Box } from "@mui/material";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSlider } from "@/app/(reals)/SliderContext";
import theme from "@/styles/theme";
import slides from "@/data/slides";
import { useMediaQuery } from "react-responsive";
import ThumbsCarousel from "./ThumbsCarousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "@/styles/css/thumbnail_slider.css";

import PrevThumbArrow from "./PrevThumbArrow";
import NextThumbArrow from "./NextThumbArrow";

export function Thumbnails({ isFullScreen }: { isFullScreen: boolean }) {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const data = slides;

  console.log("isMobile", isMobile);
  const slidesToShow = isMobile ? 3 : 5;

  const {
    mainSliderRef,
    thumbSliderRef,
    activeSlide,
    setActiveSlide,
    prevSlide,
    setPrevSlide,
  } = useSlider();

  useEffect(() => {
    // console.log("All slides count", slides.length);
    // console.log("Slides to show", slidesToShow);
    console.log("Current slide", activeSlide);
    console.log("Prev slide", prevSlide);
    const divs = document.querySelectorAll(
      'div[data-index][aria-hidden="false"]'
    );
    // Create an array of data-index attributes, ensuring they are parsed correctly
    const dataIndexArray = Array.from(divs)
      .map((div) => div.getAttribute("data-index"))
      .filter((dataIndex): dataIndex is string => dataIndex !== null) // Type guard to filter out null values
      .map((dataIndex) => parseInt(dataIndex, 10)); // Parse to integer

    // console.log(dataIndexArray[dataIndexArray.length - 1]);
    if (activeSlide >= dataIndexArray[dataIndexArray.length - 1]) {
      thumbSliderRef.current.slickGoTo(activeSlide);
    } else if (activeSlide === dataIndexArray[1] && prevSlide > activeSlide) {
      console.log("activeSlide", activeSlide);
      console.log("dataIndexArray[0]", dataIndexArray[1]);
      // console.log("First slide", dataIndexArray[1]);
      console.log("go back to ");
      thumbSliderRef.current.slickGoTo(activeSlide - slidesToShow);
    } else if (activeSlide < dataIndexArray[1] && prevSlide > activeSlide) {
      thumbSliderRef.current.slickGoTo(activeSlide - slidesToShow);
    }
    // if ( activeSlide === dataIndexArray[dataIndexArray.length-1])
    // divs.forEach((div) => {
    //   console.log(div.getAttribute("data-index"));
    // });
    // if ((activeSlide + 1) % slidesToShow === 0) {
    //   console.log(activeSlide + 1, "is last in a row");
    // }
    // const isLastSlideInRow =
    //   (activeSlide) % slidesToShow === 0 ||
    //   activeSlide === thumbDetails.length - 1;
    // console.log("isLastSlideInRow", isLastSlideInRow);
    // if (isLastSlideInRow) {
    //   thumbSliderRef.current.slickGoTo(activeSlide);
    // }
  }, [activeSlide]);

  const next = () => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      mainSliderRef.current.slickGoTo(activeSlide + 1);
    }
  };

  const prev = () => {
    console.log("moving backward");
    if (mainSliderRef.current && thumbSliderRef.current) {
      mainSliderRef.current.slickGoTo(activeSlide - 1);
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [hoverdThumb, setHoverdThumb] = useState(-1);

  // Get all images from data file

  const thumbDetails = data.map(({ id, thumbUrl: url }) => ({ id, url }));

  const handleThumbnailClick = (index: number) => {
    console.log("click");
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
    }
    setActiveSlide(index);
    setPrevSlide(activeSlide);
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
    draggable: false,
    swipeToSlide: true,
    touchThreshold: 10,
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
    beforeChange: (current, next) => {
      // setActiveSlide(next);
      setPrevSlide(current);
    },
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
