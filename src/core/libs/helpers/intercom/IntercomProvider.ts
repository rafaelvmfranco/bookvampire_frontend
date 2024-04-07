import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useUserData } from "~/core/libs/hooks/useUserData";

import {
	boot as bootIntercom,
	load as loadIntercom,
	update as updateIntercom,
} from "./intercom";

export const IntercomProvider = ({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode => {
	const pathname = usePathname();
	const { userData } = useUserData();

	if (
		typeof window !== "undefined" &&
		process.env.NEXT_PUBLIC_INTERCOM_APP_ID
	) {
		loadIntercom();
		bootIntercom(userData?.email ?? "");
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_INTERCOM_APP_ID) {
			updateIntercom();
		}
	}, [pathname]);

	return children;
};
