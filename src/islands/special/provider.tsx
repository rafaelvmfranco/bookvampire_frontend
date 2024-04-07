"use client";

import { ThemeProvider } from "next-themes";
import { Provider as BalancerProvider } from "react-wrap-balancer";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BalancerProvider>{children}</BalancerProvider>
      </ThemeProvider>
    </>
  );
};
