import { useState } from "react";
import { capitalCase } from "change-case";

import type { iconList } from "~/core/libs/helpers/iconList";
import Icon from "~/islands/ui/Icon/Icon";

import styles from "./MenuButton.module.scss";

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  iconName: keyof typeof iconList;
  type: "add" | "open";
  isSelected?: boolean;
  color: "gold" | "primary";
}

export const MenuButton = (props: ButtonProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
      ${styles.menu_button_wrapper} 
      ${props.isSelected ? styles.selected : ""}
      ${props.color === "gold" ? styles.gold : ""}
      `}
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.left}>
        <Icon name={props.iconName} size="normal" color={props.color} />
        <span
          className={`
          ${styles.title} 
          ${
            props.color === "gold"
              ? styles.gold
              : isHovered
                ? styles.primary
                : ""
          }`}
        >
          {capitalCase(props.label)}
        </span>
      </div>
    </div>
  );
};
