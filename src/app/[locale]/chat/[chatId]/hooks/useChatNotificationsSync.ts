import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useChatApi } from "~/core/libs/api/chat/useChatApi";
import { useNotificationApi } from "~/core/libs/api/notification/useNotificationApi";
import { useChatContext } from "~/core/libs/context";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";

import { getChatNotificationsQueryKey } from "../utils/getChatNotificationsQueryKey";
import { getMessagesFromChatItems } from "../utils/getMessagesFromChatItems";
import { getNotificationsFromChatItems } from "../utils/getNotificationsFromChatItems";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChatNotificationsSync = () => {
	const { setMessages, setNotifications, notifications } = useChatContext();
	const { getChatItems } = useChatApi();
	const { getChatNotifications } = useNotificationApi();
	const { setShouldDisplayFeedCard } = useKnowledgeToFeedContext();
	const params = useParams();
	const chatId = params?.chatId as string | undefined;

	const chatNotificationsQueryKey = getChatNotificationsQueryKey(chatId ?? "");
	const { data: fetchedNotifications = [] } = useQuery({
		queryKey: [chatNotificationsQueryKey],
		enabled: notifications.length > 0,
		queryFn: () => {
			if (chatId === undefined) {
				return [];
			}

			return getChatNotifications(chatId);
		},
		refetchInterval: () => {
			if (notifications.length === 0) {
				return false;
			}
			const hasAPendingNotification = notifications.find(
				(item) => item.status === "Pending",
			);

			if (hasAPendingNotification) {
				return 2_000; // in ms
			}

			return false;
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (fetchedNotifications.length === 0) {
			return;
		}
		setNotifications(fetchedNotifications);
	}, [fetchedNotifications]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setShouldDisplayFeedCard(false);
		const fetchHistory = async () => {
			if (chatId === undefined) {
				setMessages([]);
				setNotifications([]);

				return;
			}
			const chatItems = await getChatItems(chatId);
			const messagesFromChatItems = getMessagesFromChatItems(chatItems);
			if (
				messagesFromChatItems.length > 1 ||
				(messagesFromChatItems[0] && messagesFromChatItems[0].assistant !== "")
			) {
				setMessages(messagesFromChatItems);
				setNotifications(getNotificationsFromChatItems(chatItems));
			}
		};
		void fetchHistory();
	}, [chatId]);
};
