/* eslint-disable @next/next/no-img-element */
"use client";
import { Link } from "@mui/material";
import {
  Box,
  Container,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Grid,
} from "@mui/material";
import Image from "next/image";
import Carousel from "@/components/Carousel";

import img from "/home_image.png";
import Logo from "@/components/ui/Logo";
import FullSreen from "@/components/ui/FullScreen";
import Share from "@/components/ui/Share";

export default function Page() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  return (
    <>
      <Box
        maxWidth="100vw"
        maxHeight="100vh"
        // // bgcolor={"black"}
        // height={"100vh"}
      >
        <Carousel>
          <Box height="100vh">
            <img
              src="https://via.placeholder.com/1920x1080"
              alt="Slide 1"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box height="100vh">
            <img
              src="https://via.placeholder.com/1920x1080"
              alt="Slide 2"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box height="100vh">
            <img
              src="https://via.placeholder.com/1920x1080"
              alt="Slide 3"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Carousel>
      </Box>
    </>
  );
}
