import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type { Subscription } from "~/core/libs/api/brain/brain";
import { useBrainApi } from "~/core/libs/api/brain/useBrainApi";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useToast } from "~/core/libs/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainUsers = (brainId: string) => {
	const [brainUsers, setBrainUsers] = useState<Subscription[]>([]);
	const [isFetchingBrainUsers, setFetchingBrainUsers] = useState(false);

	const { publish } = useToast();
	const { getBrainUsers } = useBrainApi();
	const { session } = useSupabase();
	const t = useTranslations("brain");

	const fetchBrainUsers = async () => {
		// Optimistic update
		setFetchingBrainUsers(brainUsers.length === 0);
		try {
			const users = await getBrainUsers(brainId);
			setBrainUsers(users.filter(({ email }) => email !== session?.user.email));
		} catch {
			publish({
				variant: "danger",
				text: t("errorFetchingBrainUsers", { ns: "brain" }),
			});
		} finally {
			setFetchingBrainUsers(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		void fetchBrainUsers();
	}, []);

	return {
		brainUsers,
		fetchBrainUsers,
		isFetchingBrainUsers,
	};
};
