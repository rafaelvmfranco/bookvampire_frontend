/* eslint-disable max-lines */

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthApi } from "~/core/libs/api/auth/useAuthApi";
import { USER_IDENTITY_DATA_KEY } from "~/core/libs/api/user/config";
import type { UserIdentity } from "~/core/libs/api/user/user";
import { useUserApi } from "~/core/libs/api/user/useUserApi";
import copyToClipboard from "~/core/libs/helpers/copyToClipboard";
import { useToast } from "~/core/libs/hooks";
import { useGAnalyticsEventTracker } from "~/data/services/analytics/google/useGAnalyticsEventTracker";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useApiKeyConfig = () => {
	const [apiKey, setApiKey] = useState("");
	const [openAiApiKey, setOpenAiApiKey] = useState<string | null>();
	const [
		changeOpenAiApiKeyRequestPending,
		setChangeOpenAiApiKeyRequestPending,
	] = useState(false);
	const { updateUserIdentity, getUserIdentity } = useUserApi();
	const { track } = useEventTracking();
	const { createApiKey } = useAuthApi();
	const { publish } = useToast();
	const [userIdentity, setUserIdentity] = useState<UserIdentity>();
	const queryClient = useQueryClient();
	const { data: userData } = useQuery({
		queryKey: [USER_IDENTITY_DATA_KEY],
		queryFn: getUserIdentity,
	});
	const { eventTracker: gaEventTracker } = useGAnalyticsEventTracker({
		category: "QUIVR_API_KEY",
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (userData !== undefined) {
			setUserIdentity(userData);
		}
	}, [userData]);

	const handleCreateClick = async () => {
		try {
			void track("CREATE_API_KEY");
			gaEventTracker?.({ action: "CREATE_API_KEY" });
			const createdApiKey = await createApiKey();
			setApiKey(createdApiKey);
		} catch (error) {
			console.error("Error creating API key: ", error);
		}
	};

	const handleCopyClick = () => {
		if (apiKey !== "") {
			void track("COPY_API_KEY");
			gaEventTracker?.({ action: "COPY_API_KEY" });

			void copyToClipboard(apiKey);
		}
	};

	const changeOpenAiApiKey = async () => {
		try {
			setChangeOpenAiApiKeyRequestPending(true);

			await updateUserIdentity({
				username: userIdentity?.username ?? "",
				onboarded: userIdentity?.onboarded ?? false,
			});
			void queryClient.invalidateQueries({
				queryKey: [USER_IDENTITY_DATA_KEY],
			});

			publish({
				variant: "success",
				text: "OpenAI API Key updated",
			});
		} catch (error) {
			console.error(error);
		} finally {
			setChangeOpenAiApiKeyRequestPending(false);
		}
	};

	const removeOpenAiApiKey = async () => {
		try {
			setChangeOpenAiApiKeyRequestPending(true);
			await updateUserIdentity({
				username: userIdentity?.username ?? "",
				onboarded: userIdentity?.onboarded ?? false,
			});

			publish({
				variant: "success",
				text: "OpenAI API Key removed",
			});

			void queryClient.invalidateQueries({
				queryKey: [USER_IDENTITY_DATA_KEY],
			});
		} catch (error) {
			console.error(error);
		} finally {
			setChangeOpenAiApiKeyRequestPending(false);
		}
	};

	return {
		handleCreateClick,
		apiKey,
		handleCopyClick,
		openAiApiKey,
		setOpenAiApiKey,
		changeOpenAiApiKey,
		changeOpenAiApiKeyRequestPending,
		userIdentity,
		removeOpenAiApiKey,
	};
};
