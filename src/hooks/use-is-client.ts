import { useEffect, useState } from "react";

export function useIsClient() {
	const [isClient, setClient] = useState(false);

	/**
	 * Mark the app as mounted in the client
	 */
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setClient(true);
	}, []);

	return isClient;
}
