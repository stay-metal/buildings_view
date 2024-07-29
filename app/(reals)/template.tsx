"use client";
import { Header } from "@/components/Header";
import FullSreen from "@/components/Buttons/FullScreen";
import Logo from "@/components/ui/Logo";
import Share from "@/components/Buttons/Share";
import Footer from "@/components/Footer";
import { SliderProvider } from "./SliderContext";
import React, { useState, useEffect, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { useSxAppContext } from "../SxAppContext";

const Thumbnails = React.lazy(() => import("@/components/Slider/Thumbnails"));

export default function Template({ children }: { children: React.ReactNode }) {
  const { isFullScreen, setIsFullScreen } = useSxAppContext();
  const [showThumbnails, setShowThumbnails] = useState(false);
  // const [isFullScreen, setIsFullScreen] = useState(false);

  // Timer to show loading spinner for a minimum amount of time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThumbnails(true);
    }, 0); // Set the minimum loading time in milliseconds (e.g., 1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  function handleFullScreenClick() {
    setIsFullScreen(!isFullScreen);
  }
  return (
    <>
      <SliderProvider>
        <Header>
          <FullSreen
            onClick={handleFullScreenClick}
            isFullScreen={isFullScreen}
          />
          <Logo />
          <Share isFullScreen={isFullScreen} />
        </Header>
        {children}
        <Footer>
          <Suspense fallback={<CircularProgress />}>
            {showThumbnails && <Thumbnails isFullScreen={isFullScreen} />}
          </Suspense>
        </Footer>
      </SliderProvider>
    </>
  );
}
