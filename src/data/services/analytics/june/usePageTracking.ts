"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useSupabase } from "~/core/libs/context/SupabaseProvider";

import { useJune } from "./useJune";

export const usePageTracking = (): void => {
	const analytics = useJune();
	const pathname = usePathname();
	const { session } = useSupabase();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (pathname !== null) {
			const handleRouteChange = async () => {
				await analytics?.identify(session?.user.id);
				await analytics?.page(pathname);
			};

			void handleRouteChange();
		}
	}, [analytics, pathname, session?.user.id]);
};
