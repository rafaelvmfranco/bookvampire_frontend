import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./MessageContent.module.scss";

export const MessageContent = ({
	text,
	isUser,
}: {
	text: string;
	isUser: boolean;
}): JSX.Element => {
	const [showLog] = useState(true);
	const [isLog, setIsLog] = useState(true);

	const extractLog = (log: string) => {
		const logRegex = /🧠<([^>]+)>🧠/gu;
		const logs: string[] = [];
		let match = logRegex.exec(log);

		while (match) {
			// Add two spaces and a newline for markdown line break
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			logs.push(`- ${match[1]}  \n`);
			match = logRegex.exec(log);
		}

		return {
			logs: logs.join(""), // Join with empty string, each log already has newline
			cleanedText: log.replace(logRegex, ""),
		};
	};

	/* const extractLog = (log: string) => {
    const logRegex = /🧠<([^>]+)>🧠/gu;
    const logs = [];
    let match;

    while ((match = logRegex.exec(log))) {
      // Add two spaces and a newline for markdown line break
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      logs.push("- " + match[1] + "  \n");
    }

    return {
      logs: logs.join(""), // Join with empty string, each log already has newline
      cleanedText: log.replace(logRegex, ""),
    };
  }; */

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (text.includes("🧠<")) {
			setIsLog(true);
		} else {
			setIsLog(false);
		}
	}, [text]);

	const { logs, cleanedText } = extractLog(text);

	return (
		<div data-testid="chat-message-text">
			{isLog && showLog && logs.length > 0 && (
				<div className="rounded p-2 text-xs text-white">
					<ReactMarkdown>{logs}</ReactMarkdown>
				</div>
			)}
			<ReactMarkdown
				className={`
        ${styles.markdown} 
        ${isUser ? styles.user : styles.brain}
        ${cleanedText === "🧠" ? styles.thinking : ""} 
        `}
			>
				{cleanedText}
			</ReactMarkdown>
		</div>
	);
};
