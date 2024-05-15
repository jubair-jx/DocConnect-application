import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./lib/Providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocConnect",
  description: "Get your own doctor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <>
            {" "}
            <Toaster  position="top-right"/>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </>
        </body>
      </html>
    </Providers>
  );
}
