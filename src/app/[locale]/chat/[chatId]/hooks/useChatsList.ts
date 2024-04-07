import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { CHATS_DATA_KEY } from "~/core/libs/api/chat/config";
import { useChatApi } from "~/core/libs/api/chat/useChatApi";
import { useChatsContext } from "~/core/libs/context/ChatsProvider/hooks/useChatsContext";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useToast } from "~/core/libs/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChatsList = () => {
	const t = useTranslations("chat");

	const { setAllChats, setIsLoading } = useChatsContext();
	const { publish } = useToast();
	const { getChats } = useChatApi();
	const { session } = useSupabase();

	const fetchAllChats = async () => {
		if (session) {
			try {
				const response = await getChats();

				return response.reverse();
			} catch (error) {
				console.error(error);
				publish({
					variant: "danger",
					text: t("errorFetching", { ns: "chat" }),
				});
			}
		}
	};

	const { data: chats, isLoading } = useQuery({
		queryKey: [CHATS_DATA_KEY],
		queryFn: fetchAllChats,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setAllChats(chats ?? []);
	}, [chats]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading]);
};
