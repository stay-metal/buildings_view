"use client";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import FullSreen from "@/components/Buttons/FullScreen";
import Logo from "@/components/ui/Logo";
import Share from "@/components/Buttons/Share";
import Footer from "@/components/Footer";
import "./globals.css";
import { Thumbnails } from "@/components/Slider/Thumbnails";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body>
        <Providers>
          <Header>
            <FullSreen />
            <Logo />
            <Share />
          </Header>

          {children}
          <Footer>
            <Thumbnails />
          </Footer>
        </Providers>
      </body>
    </html>
  );
}
