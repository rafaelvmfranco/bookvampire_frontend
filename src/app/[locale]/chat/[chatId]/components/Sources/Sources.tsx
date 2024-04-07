"use client";

import { useEffect, useState } from "react";

import { useChatContext } from "~/core/libs/context";
import type { Source } from "~/core/libs/types/MessageMetadata";
import { Icon } from "~/islands/ui/Icon/Icon";

import type { ChatMessage } from "../../types";
import styles from "./Sources.module.scss";

const Sources = (): JSX.Element => {
	const { messages } = useChatContext();
	const [selectedMessageSources, setSelectedMessageSources] =
		useState<Source[]>();
	const { sourcesMessageIndex, setSourcesMessageIndex } = useChatContext();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (messages.length > 0 && sourcesMessageIndex !== undefined) {
			const selectedMessage: ChatMessage = messages[sourcesMessageIndex];
			const newSources: Source[] = (
				selectedMessage.metadata?.sources ?? []
			).map((source: Source) => ({
				...source,
				frequency: 0,
			}));

			const updatedSources: Source[] = [];

			newSources.forEach((newSource) => {
				const existingSourceIndex = updatedSources.findIndex(
					(source) => source.name.trim() === newSource.name.trim(),
				);
				if (existingSourceIndex !== -1) {
					updatedSources[existingSourceIndex] = {
						...updatedSources[existingSourceIndex],
						frequency: updatedSources[existingSourceIndex].frequency + 1,
					};
				} else {
					updatedSources.push(newSource);
				}
			});

			updatedSources.sort((a, b) => b.frequency - a.frequency);

			setSelectedMessageSources(updatedSources);
		}
	}, [messages, sourcesMessageIndex]);

	return (
		<div className={styles.sources_wrapper}>
			<div className={styles.title_wrapper}>
				<div className={styles.left}>
					<Icon name="file" color="primary" size="normal" />
					<span className={styles.title}>Sources</span>
				</div>
				<Icon
					name="close"
					color="black"
					size="normal"
					handleHover={true}
					onClick={() => setSourcesMessageIndex(undefined)}
				/>
			</div>
			<div className={styles.source_list}>
				{selectedMessageSources?.map((source, index) => (
					<div className={styles.source_wrapper} key={index}>
						<a
							href={source.source_url}
							key={index}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className={styles.source}>{source.name}</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Sources;
