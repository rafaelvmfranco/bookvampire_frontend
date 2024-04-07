import { useState } from "react";

import type { iconList } from "~/core/libs/helpers/iconList";
import type { Color } from "~/core/libs/types/Colors";

import { Icon } from "../Icon/Icon";
import styles from "./TextButton.module.scss";

interface TextButtonProps {
  iconName: keyof typeof iconList;
  label: string;
  color: Color;
  onClick?: () => void;
}

export const TextButton = (props: TextButtonProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.text_button_wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={props.onClick}
    >
      <Icon
        name={props.iconName}
        size="normal"
        color={props.color}
        hovered={hovered}
      />
      <span
        className={`
        ${styles[props.color] ?? ""}
        ${hovered ? styles.hovered ?? "" : ""}
        `}
      >
        {props.label}
      </span>
    </div>
  );
};

export default TextButton;
