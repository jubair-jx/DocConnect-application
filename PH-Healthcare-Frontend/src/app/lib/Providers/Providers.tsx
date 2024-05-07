"use client";

import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import theme from "../theme/theme";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
