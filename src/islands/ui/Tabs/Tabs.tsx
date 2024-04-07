import { useState } from "react";

import type { Tab } from "~/core/libs/types/Tab";

import { Icon } from "../Icon/Icon";
import styles from "./Tabs.module.scss";

type TabsProps = {
  tabList: Tab[];
};

export const Tabs = ({ tabList }: TabsProps): JSX.Element => {
  const [tabHoveredIndex, setTabHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.tabs_container}>
      {tabList.map((tab, index) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          className={`
          ${styles.tab_wrapper}
          ${tab.isSelected ? styles.selected : ""}
          ${tab.disabled ? styles.disabled : ""}
          `}
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          onClick={tab.onClick}
          onMouseEnter={() => setTabHoveredIndex(index)}
          onMouseLeave={() => setTabHoveredIndex(null)}
        >
          <Icon
            name={tab.iconName}
            size="normal"
            color={
              tab.isSelected || index === tabHoveredIndex
                ? "primary"
                : tab.disabled
                  ? "grey"
                  : "black"
            }
          />
          <span className={styles.label}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};
