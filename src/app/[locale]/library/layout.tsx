"use client";

import type { ReactNode } from "react";

import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { redirectToLogin } from "~/core/libs/router/redirectToLogin";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { session } = useSupabase();
  if (session === null) {
    redirectToLogin();
  }

  return (
    <div className="relative h-full w-full flex justify-stretch items-stretch overflow-scroll">
      {children}
    </div>
  );
};

export default Layout;
