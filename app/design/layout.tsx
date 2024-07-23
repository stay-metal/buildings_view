import type { Metadata } from "next";
import { Providers } from "../providers";
import { Header } from "@/components/Header";
import "../globals.css";

export const metadata: Metadata = {
  title: "Simplex",
  description: "Simplex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
