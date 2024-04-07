"use client";

import { useEffect } from "react";

import PageHeader from "~/core/libs/components/PageHeader/PageHeader";
import { UploadDocumentModal } from "~/core/libs/components/UploadDocumentModal/UploadDocumentModal";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import type { ButtonType } from "~/core/libs/types/QuivrButton";

import { BrainManagementTabs } from "./BrainManagementTabs/BrainManagementTabs";
import { DeleteOrUnsubscribeConfirmationModal } from "./BrainManagementTabs/components/DeleteOrUnsubscribeModal/DeleteOrUnsubscribeConfirmationModal";
import { useBrainManagementTabs } from "./BrainManagementTabs/hooks/useBrainManagementTabs";
import { getBrainPermissions } from "./BrainManagementTabs/utils/getBrainPermissions";
import { useBrainManagement } from "./hooks/useBrainManagement";
import styles from "./page.module.scss";

const BrainsManagement = (): JSX.Element => {
  //   const { brain } = useBrainManagement();
  //   const {
  //     handleUnsubscribeOrDeleteBrain,
  //     isDeleteOrUnsubscribeModalOpened,
  //     setIsDeleteOrUnsubscribeModalOpened,
  //     isDeleteOrUnsubscribeRequestPending,
  //   } = useBrainManagementTabs(brain?.id);
  //   const { allBrains } = useBrainContext();
  //   const { isOwnedByCurrentUser } = getBrainPermissions({
  //     brainId: brain?.id,
  //     userAccessibleBrains: allBrains,
  //   });
  //   const { setShouldDisplayFeedCard } = useKnowledgeToFeedContext();
  //   const { setCurrentBrainId } = useBrainContext();

  //   const buttons: ButtonType[] = [
  //     {
  //       label: "Add knowledge",
  //       color: "primary",
  //       onClick: () => {
  //         setShouldDisplayFeedCard(true);
  //       },
  //       iconName: "uploadFile",
  //       hidden: !isOwnedByCurrentUser || !brain?.max_files,
  //     },
  //     {
  //       label: isOwnedByCurrentUser ? "Delete Brain" : "Unsubscribe from Brain",
  //       color: "dangerous",
  //       onClick: () => {
  //         setIsDeleteOrUnsubscribeModalOpened(true);
  //       },
  //       iconName: "delete",
  //     },
  //   ];

  //   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  //   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  //   useEffect(() => {
  //     if (brain) {
  //       setCurrentBrainId(brain.id);
  //     }
  //   }, [brain]);

  //   if (!brain) {
  //     return <></>;
  //   }

  return (
    <>
      <div className={styles.brain_management_wrapper}>
        <div className={styles.content_wrapper}>
          <BrainManagementTabs />
        </div>
      </div>
      {/* <UploadDocumentModal />
      <DeleteOrUnsubscribeConfirmationModal
        isOpen={isDeleteOrUnsubscribeModalOpened}
        setOpen={setIsDeleteOrUnsubscribeModalOpened}
        onConfirm={() => void handleUnsubscribeOrDeleteBrain()}
        isOwnedByCurrentUser={isOwnedByCurrentUser}
        isDeleteOrUnsubscribeRequestPending={
          isDeleteOrUnsubscribeRequestPending
        }
      /> */}
    </>
  );
};

export default BrainsManagement;
