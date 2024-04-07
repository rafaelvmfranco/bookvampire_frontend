import { useState } from "react";
import { useTranslations } from "next-intl";

import { KnowledgeToFeed } from "~/app/[locale]/chat/[chatId]/components/ActionsBar/components";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";

import { Modal } from "~/islands/ui/Modal/Modal";
import { QuivrButton } from "~/islands/ui/QuivrButton/QuivrButton";
import { useAddKnowledge } from "./hooks/useAddKnowledge";
import styles from "./UploadDocumentModal.module.scss";

export const UploadDocumentModal = (): JSX.Element => {
	const { shouldDisplayFeedCard, setShouldDisplayFeedCard, knowledgeToFeed } =
		useKnowledgeToFeedContext();
	const { currentBrain } = useBrainContext();
	const { feedBrain } = useAddKnowledge();
	const [feeding, setFeeding] = useState<boolean>(false);

	useKnowledgeToFeedContext();
	const t = useTranslations("knowledge");

	const handleFeedBrain = async () => {
		setFeeding(true);
		await feedBrain();
		setFeeding(false);
		setShouldDisplayFeedCard(false);
	};

	if (!shouldDisplayFeedCard) {
		return <></>;
	}

	return (
		<Modal
			isOpen={shouldDisplayFeedCard}
			setOpen={setShouldDisplayFeedCard}
			title={t("addKnowledgeTitle", { ns: "knowledge" })}
			desc={t("addKnowledgeSubtitle", { ns: "knowledge" })}
			size="big"
			CloseTrigger={<div />}
		>
			<div className={styles.knowledge_modal}>
				<KnowledgeToFeed />
				<div className={styles.button}>
					<QuivrButton
						label="Feed Brain"
						color="primary"
						iconName="add"
						onClick={handleFeedBrain}
						disabled={knowledgeToFeed.length === 0 || !currentBrain}
						isLoading={feeding}
					/>
				</div>
			</div>
		</Modal>
	);
};
