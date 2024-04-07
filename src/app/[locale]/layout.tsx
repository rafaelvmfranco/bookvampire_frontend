/* [#] LocaleLayout (layout.tsx) */

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cookies, headers } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

import { SupabaseProvider } from "~/core/libs/context/SupabaseProvider";
import { cn } from "~/core/utils";
import { App } from "~/islands/special/app";
import { Tailwind } from "~/islands/special/indicator";
import { Providers } from "~/islands/special/provider";
import { ToastProvider } from "~/islands/ui/toast";
import { Toaster } from "~/islands/ui/toaster";

import "../globals.css";
import "flag-icons/css/flag-icons.min.css";

import localFont from "next/font/local";

import { NextIntlProvider } from "~/islands/special/nextintl";

import styles from "./layout.module.scss";
import { Header } from "~/islands/special/header";
import { Sidebar } from "~/islands/special/sidebar";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontCarelia = localFont({
  src: "../../core/assets/fonts/carelia.woff2",
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Book Vampire",
  description: "Book Vampire",
};

const LocaleLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          styles.body,
          "bg-background font-sans antialiased",
          fontCarelia.variable,
          fontSans.variable,
        )}
      >
        <NextIntlProvider locale={locale}>
          <SupabaseProvider session={session}>
            <ToastProvider>
              <Providers>
                <App>
                  <Header stick={false} />
                  <main className="space-y-24 lg:space-y-32 mt-[9%] md:mt-[8%] lg:mt-[7%] xl:mt-[6%] 2xl:mt-[5%] mb-8">
                    {children}
                  </main>
                </App>
                <Tailwind />
                <Toaster />
              </Providers>
            </ToastProvider>
          </SupabaseProvider>
          <VercelAnalytics />
        </NextIntlProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
