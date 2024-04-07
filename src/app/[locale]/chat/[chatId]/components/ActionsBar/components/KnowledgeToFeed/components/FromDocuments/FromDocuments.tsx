import { useEffect, useState } from "react";

import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useCustomDropzone } from "~/core/libs/hooks/useDropzone";
import { Icon } from "~/islands/ui/Icon/Icon";

import styles from "./FromDocuments.module.scss";

export const FromDocuments = (): JSX.Element => {
	const [dragging, setDragging] = useState<boolean>(false);
	const { getRootProps, getInputProps, open } = useCustomDropzone();
	const { knowledgeToFeed } = useKnowledgeToFeedContext();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setDragging(false);
	}, [knowledgeToFeed]);

	return (
		<div
			className={`
      ${styles.from_document_wrapper} 
      ${dragging ? styles.dragging : ""}
      `}
			{...getRootProps()}
			onDragOver={() => setDragging(true)}
			onDragLeave={() => setDragging(false)}
			onMouseLeave={() => setDragging(false)}
			onClick={open}
		>
			<Icon name="upload" size="big" color={dragging ? "accent" : "black"} />
			<div className={styles.input}>
				<div className={styles.clickable}>
					<span>Choose files</span>
					<input {...getInputProps()} />
				</div>
				<span>or drag it here</span>
			</div>
		</div>
	);
};
