import { useUserSettingsContext } from "~/core/libs/context/UserSettingsProvider/hooks/useUserSettingsContext";
import type { iconList } from "~/core/libs/helpers/iconList";
import type { Color } from "~/core/libs/types/Colors";

import { Icon } from "../Icon/Icon";
import styles from "./MessageInfoBox.module.scss";

export type MessageInfoBoxProps = {
  children: React.ReactNode;
  type: "info" | "success" | "warning" | "error";
  unforceWhite?: boolean;
};

export const MessageInfoBox = ({
  children,
  type,
  unforceWhite,
}: MessageInfoBoxProps): JSX.Element => {
  const getIconProps = (): {
    iconName: keyof typeof iconList;
    iconColor: Color;
  } => {
    switch (type) {
      case "info":
        return { iconName: "info", iconColor: "primary" };
      case "success":
        return { iconName: "check", iconColor: "success" };
      case "warning":
        return { iconName: "warning", iconColor: "warning" };
      default:
        return { iconName: "info", iconColor: "primary" };
    }
  };

  const { isDarkMode } = useUserSettingsContext();

  return (
    <div
      className={`${styles.message_info_box_wrapper} ${styles[type]} ${
        isDarkMode && !unforceWhite ? styles.dark : ""
      }`}
    >
      <Icon
        name={getIconProps().iconName}
        size="normal"
        color={getIconProps().iconColor}
      />
      {children}
    </div>
  );
};
