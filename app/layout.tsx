"use client";
import { SxAppProvider } from "./SxAppContext";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body>
        <SxAppProvider>
          <Providers>{children}</Providers>
        </SxAppProvider>
      </body>
    </html>
  );
}
