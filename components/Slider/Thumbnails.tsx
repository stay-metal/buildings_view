import { Box } from "@mui/material";

import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "@/styles/css/thumbnail_slider.css";

import PrevThumbArrow from "./PrevThumbArrow";
import NextThumbArrow from "./NextThumbArrow";

export function Thumbnails() {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [hoverdThumb, setHoverdThumb] = useState(-1);

  const thumbsList = [
    { id: 1, url: "/placeholders/82x82.png" },
    { id: 2, url: "/placeholders/82x82.png" },
    { id: 3, url: "/placeholders/82x82.png" },
    { id: 4, url: "/placeholders/82x82.png" },
    { id: 5, url: "/placeholders/82x82.png" },
    { id: 6, url: "/placeholders/82x82.png" },
    { id: 7, url: "/placeholders/82x82.png" },
    { id: 8, url: "/placeholders/82x82.png" },
    { id: 9, url: "/placeholders/82x82.png" },
    { id: 10, url: "/placeholders/82x82.png" },
    { id: 11, url: "/placeholders/82x82.png" },
    { id: 12, url: "/placeholders/82x82.png" },
    { id: 13, url: "/placeholders/82x82.png" },
    { id: 14, url: "/placeholders/82x82.png" },
    { id: 15, url: "/placeholders/82x82.png" },
  ];

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    swipeToSlide: true,
    touchThreshold: 10,
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
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.15)",
        },
      }}
    >
      <PrevThumbArrow onClick={prev} />
      <Box
        sx={{
          display: "inline-block",
          width: "521px",
          alignItems: "center",
          transition: "transform 0.3s ease",
        }}
      >
        <Slider
          {...settings}
          ref={sliderRef}
          className="sx-thumbnails__container"
        >
          {thumbsList.map((thumb) => (
            <Box
              key={thumb.id}
              sx={{
                padding: "2px",
                transition: "transform 0.3s ease",
                transform: isHovered ? "scale(0.98)" : "none",
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
