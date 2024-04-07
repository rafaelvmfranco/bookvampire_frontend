"use client";

import type { UUID } from "node:crypto";
import { AnimatePresence, motion } from "framer-motion";

import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { LoaderIcon } from "~/islands/ui/LoaderIcon/LoaderIcon";
import { MessageInfoBox } from "~/islands/ui/MessageInfoBox/MessageInfoBox";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";

import { useAddedKnowledge } from "./hooks/useAddedKnowledge";
import styles from "./KnowledgeTab.module.scss";
import { KnowledgeTable } from "./KnowledgeTable/KnowledgeTable";

type KnowledgeTabProps = {
  brainId: UUID;
  hasEditRights: boolean;
};
export const KnowledgeTab = ({ brainId }: KnowledgeTabProps): JSX.Element => {
  const { isPending, allKnowledge } = useAddedKnowledge({
    brainId,
  });
  const { setShouldDisplayFeedCard } = useKnowledgeToFeedContext();

  if (isPending) {
    return <LoaderIcon size="big" color="accent" />;
  }

  if (allKnowledge.length === 0) {
    return (
      <div className={styles.knowledge_tab_wrapper}>
        <MessageInfoBox type="warning">
          This book is empty! You can add knowledge by clicking on
          <QuivrButton
            label="Add knowledge"
            color="primary"
            iconName="add"
            onClick={() => setShouldDisplayFeedCard(true)}
          />
          .
        </MessageInfoBox>
      </div>
    );
  }

  return (
    <div className={styles.knowledge_tab_wrapper}>
      <motion.div layout className="w-full flex flex-col gap-5">
        <AnimatePresence mode="popLayout">
          <KnowledgeTable knowledgeList={allKnowledge} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
