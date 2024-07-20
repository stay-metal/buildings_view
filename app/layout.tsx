import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

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
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
