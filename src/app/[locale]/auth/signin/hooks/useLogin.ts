import { useEffect } from "react";

import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { redirectToPreviousPageOrSearchPage } from "~/core/libs/helpers/redirectToPreviousPageOrSearchPage";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLogin = () => {
	const { session } = useSupabase();

	const { track } = useEventTracking();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (session?.user !== undefined) {
			void track("SIGNED_IN");
			redirectToPreviousPageOrSearchPage();
		}
	}, [session?.user]);
};
