import type { Color } from "~/core/libs/types/Colors";
import type { IconSize } from "~/core/libs/types/Icons";

import { Icon } from "../Icon/Icon";
import styles from "./LoaderIcon.module.scss";

interface LoaderIconProps {
  size: IconSize;
  color: Color;
}

export const LoaderIcon = (props: LoaderIconProps): JSX.Element => {
  return (
    <Icon
      name="loader"
      size={props.size}
      color={props.color}
      classname={styles.loader_icon ?? ""}
    />
  );
};
