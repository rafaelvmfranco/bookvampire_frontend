/* eslint-disable max-lines */

import { useEffect, useState } from "react";

import type { Tab } from "~/core/libs/types/Tab";
import Spinner from "~/islands/ui/Spinner";
import { Tabs } from "~/islands/ui/Tabs/Tabs";
import { usePathname } from "next/navigation";
import { KnowledgeTab } from "./components/KnowledgeTab/KnowledgeTab";
import { PeopleTab } from "./components/PeopleTab/PeopleTab";
import { SettingsTab } from "./components/SettingsTab/SettingsTab";
import { useBrainFetcher } from "./hooks/useBrainFetcher";
import { useBrainManagementTabs } from "./hooks/useBrainManagementTabs";

export const BrainManagementTabs = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState("Settings");
  const { brainId, hasEditRights } = useBrainManagementTabs();

  const pathname = usePathname();
  const bookId = pathname.split("/").pop() ?? "1";

  //   const { brain, isLoading } = useBrainFetcher({
  //     brainId,
  //   });

  //   const knowledgeTabDisabled = (): boolean => {
  //     return (
  //       !hasEditRights ||
  //       (brain?.integration_description?.max_files === 0 &&
  //         brain.brain_type !== "doc")
  //     );
  //   };

  const brainManagementTabs: Tab[] = [
    {
      label: "Settings",
      isSelected: selectedTab === "Settings",
      onClick: () => setSelectedTab("Settings"),
      iconName: "settings",
    },
    {
      label: "People",
      isSelected: selectedTab === "People",
      onClick: () => setSelectedTab("People"),
      iconName: "user",
      disabled: true,
    },
    /* {
      label: "Knowledge",
      isSelected: selectedTab === "Knowledge",
      onClick: () => setSelectedTab("Knowledge"),
      iconName: "file",
      // disabled: knowledgeTabDisabled(),
      disabled: true,
    }, */
  ];

  //   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  //   useEffect(() => {
  //     brainManagementTabs[2].disabled = knowledgeTabDisabled();
  //   }, [hasEditRights]);

  /* if (!brainId) {
    return <div />;
  } */

  //   if (isLoading) {
  //     return (
  //       <div className="flex w-full h-full justify-center items-center">
  //         <Spinner />
  //       </div>
  //     );
  //   }

  return (
    <>
      <Tabs tabList={brainManagementTabs} />

      {selectedTab === "Settings" && <SettingsTab bookId={bookId} />}

      {/* {selectedTab === "Settings" && <SettingsTab brainId={brainId} />}
      {selectedTab === "People" && <PeopleTab brainId={brainId} />}
      {selectedTab === "Knowledge" && (
        <KnowledgeTab brainId={brainId} hasEditRights={hasEditRights} />
      )} */}
    </>
  );
};
