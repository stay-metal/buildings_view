"use client";
import { Header } from "@/components/Header";
import FullSreen from "@/components/Buttons/FullScreen";
import Logo from "@/components/ui/Logo";
import Share from "@/components/Buttons/Share";
import Footer from "@/components/Footer";
import { Thumbnails } from "@/components/Slider/Thumbnails";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <FullSreen />
        <Logo />
        <Share />
      </Header>
      {children}
      <Footer>
        <Thumbnails />
      </Footer>
    </>
  );
}
