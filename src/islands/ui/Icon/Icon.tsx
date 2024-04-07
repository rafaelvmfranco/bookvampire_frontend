import { useEffect, useState } from "react";
import type { IconType } from "react-icons/lib";

import { iconList } from "~/core/libs/helpers/iconList";
import type { Color } from "~/core/libs/types/Colors";
import type { IconSize } from "~/core/libs/types/Icons";

import styles from "./Icon.module.scss";

interface IconProps {
  name: keyof typeof iconList;
  size: IconSize;
  color: Color;
  disabled?: boolean;
  classname?: string;
  hovered?: boolean;
  handleHover?: boolean;
  onClick?: () => void | Promise<void>;
}

export const Icon = ({
  name,
  size,
  color,
  disabled,
  classname,
  hovered,
  handleHover,
  onClick,
}: IconProps): JSX.Element => {
  const [iconHovered, setIconHovered] = useState(false);
  const IconComponent: IconType = iconList[name];

  useEffect(() => {
    if (!handleHover) {
      setIconHovered(!!hovered);
    }
  }, [hovered, handleHover]);

  return (
    <IconComponent
      className={`
      ${classname} 
      ${styles[size]} 
      ${styles[color]}
      ${disabled ? styles.disabled : ""}
      ${iconHovered || hovered ? styles.hovered : ""}
      `}
      onMouseEnter={() => handleHover && setIconHovered(true)}
      onMouseLeave={() => handleHover && setIconHovered(false)}
      onClick={onClick}
    />
  );
};

export default Icon;
