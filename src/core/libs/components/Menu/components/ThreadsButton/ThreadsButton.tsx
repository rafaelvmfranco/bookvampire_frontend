import { useEffect, useState } from "react";
import { isToday } from "date-fns";
import { useTranslations } from "next-intl";

import { useChatsContext } from "~/core/libs/context/ChatsProvider/hooks/useChatsContext";
import { FoldableSection } from "~/islands/ui/FoldableSection/FoldableSection";

import styles from "./ThreadsButton.module.scss";
import { ThreadsSection } from "./ThreadsSection/ThreadsSection";
import { isWithinLast7Days, isWithinLast30Days, isYesterday } from "./utils";

export const ThreadsButton = (): JSX.Element => {
	const [canScrollDown, setCanScrollDown] = useState<boolean>(false);
	const { allChats } = useChatsContext();
	const t = useTranslations("chat");
	const todayChats = allChats.filter((chat) =>
		isToday(new Date(chat.creation_time)),
	);
	const yesterdayChats = allChats.filter((chat) =>
		isYesterday(new Date(chat.creation_time)),
	);
	const last7DaysChats = allChats.filter((chat) =>
		isWithinLast7Days(new Date(chat.creation_time)),
	);
	const last30DaysChats = allChats.filter((chat) =>
		isWithinLast30Days(new Date(chat.creation_time)),
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const wrapper = document.querySelector(
			`.${styles.history_content_wrapper}`,
		);

		setCanScrollDown(!!wrapper && wrapper.clientHeight >= 200);

		const handleScroll = () => {
			if (wrapper) {
				const maxScrollTop = wrapper.scrollHeight - wrapper.clientHeight;
				setCanScrollDown(
					wrapper.scrollTop < maxScrollTop && wrapper.clientHeight >= 200,
				);
			}
		};

		wrapper?.addEventListener("scroll", handleScroll);

		return () => wrapper?.removeEventListener("scroll", handleScroll);
	}, [allChats]);

	return (
		<FoldableSection
			label={t("threads")}
			icon="history"
			foldedByDefault={true}
			hideBorder={true}
		>
			<div
				className={`
        ${styles.history_content_wrapper} 
        ${canScrollDown ? styles.fade_out : ""}
        `}
			>
				<ThreadsSection chats={todayChats} title={t("today")} />
				<ThreadsSection chats={yesterdayChats} title={t("yesterday")} />
				<ThreadsSection chats={last7DaysChats} title={t("last7Days")} />
				<ThreadsSection chats={last30DaysChats} title={t("last30Days")} />
			</div>
		</FoldableSection>
	);
};
