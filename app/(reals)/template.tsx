"use client";
import { Header } from "@/components/Header";
import FullSreen from "@/components/Buttons/FullScreen";
import Logo from "@/components/ui/Logo";
import Share from "@/components/Buttons/Share";
import Footer from "@/components/Footer";
import { Thumbnails } from "@/components/Slider/Thumbnails";
import { SliderProvider } from "./SliderContext";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

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
          <Thumbnails isFullScreen={isFullScreen} />
        </Footer>
      </SliderProvider>
    </>
  );
}
