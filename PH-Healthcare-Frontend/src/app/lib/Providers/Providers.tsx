"use client";

import { ThemeProvider } from "@emotion/react";
import theme from "../theme/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
