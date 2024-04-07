// "use client";

import { useState } from "react";
import { cn } from "~/core/utils";
import { buttonVariants } from "~/islands/ui/button";
import { AddBrainModal } from "~/core/libs/components/AddBrainModal";
import { useBrainCreationContext } from "~/core/libs/components/AddBrainModal/brainCreation-provider";
import PageHeader from "~/core/libs/components/PageHeader/PageHeader";
import { UploadDocumentModal } from "~/core/libs/components/UploadDocumentModal/UploadDocumentModal";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import type { ButtonType } from "~/core/libs/types/QuivrButton";
import type { Tab } from "~/core/libs/types/Tab";
import { Tabs } from "~/islands/ui/Tabs/Tabs";

import { ManageBrains } from "./BrainsTabs/components/ManageBrains/ManageBrains";
import styles from "./page.module.scss";
import BookTable from "./table";

const Library = (): JSX.Element => {
  /* const [selectedTab, setSelectedTab] = useState("Manage my books");
  const { setShouldDisplayFeedCard } = useKnowledgeToFeedContext();
  const { setIsBrainCreationModalOpened } = useBrainCreationContext();

  const libraryTabs: Tab[] = [
    {
      label: "Manage my books",
      isSelected: selectedTab === "Manage my books",
      onClick: () => setSelectedTab("Manage my books"),
      iconName: "edit",
    },
    {
      label: "Analytics - Coming soon",
      isSelected: selectedTab === "Analytics",
      onClick: () => setSelectedTab("Analytics"),
      disabled: true,
      iconName: "graph",
    },
  ];

  const buttons: ButtonType[] = [
    {
      label: "Create book",
      color: "primary",
      onClick: () => {
        setIsBrainCreationModalOpened(true);
      },
      iconName: "brain",
    },
    {
      label: "Add knowledge",
      color: "primary",
      onClick: () => {
        setShouldDisplayFeedCard(true);
      },
      iconName: "uploadFile",
    },
  ]; */

  return (
    <section className="h-screen w-screen">
      {/* <div className={cn(styles.page_wrapper, "")}>
      <div className={styles.content_wrapper}>
        <Tabs tabList={libraryTabs} />
        {selectedTab === "Manage my books" && <ManageBrains />}
      </div>
      <UploadDocumentModal />
      <AddBrainModal />
      </div> */}

      <BookTable />
    </section>
  );
};

export default Library;
