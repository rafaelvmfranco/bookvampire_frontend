// "use client";

import type { ReactNode } from "react";
// import { type ReactNode, useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  //   const pathname = usePathname();
  //   const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(true);

  /* useEffect(() => {
		if (pathname === "/chat") {
			router.push("/search");
		} else {
			setIsLoading(false);
		}
	}, [pathname, router]);

	if (isLoading) {
		return <></>;
	} */

  return <div className="mx-auto">{children}</div>;
};

export default Layout;
