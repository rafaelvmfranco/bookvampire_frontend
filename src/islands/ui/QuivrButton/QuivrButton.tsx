import { useState } from "react";

import { useUserSettingsContext } from "~/core/libs/context/UserSettingsProvider/hooks/useUserSettingsContext";
import type { ButtonType } from "~/core/libs/types/QuivrButton";

import { Icon } from "../Icon/Icon";
import { LoaderIcon } from "../LoaderIcon/LoaderIcon";
import styles from "./QuivrButton.module.scss";

export const QuivrButton = ({
  onClick,
  label,
  color,
  isLoading,
  iconName,
  disabled,
  hidden,
}: ButtonType): JSX.Element => {
  const [hovered, setHovered] = useState<boolean>(false);
  const { isDarkMode } = useUserSettingsContext();

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`
      ${styles.button_wrapper} 
      ${styles[color]} 
      ${disabled ? styles.disabled : ""}
      ${isDarkMode ? styles.dark : ""}
      ${hidden ? styles.hidden : ""}
      `}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unnecessary-condition
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      onClick={() => onClick && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.icon_label}>
        {!isLoading ? (
          <Icon
            name={iconName}
            size="normal"
            color={hovered ? "white" : disabled ? "grey" : color}
            handleHover={false}
          />
        ) : (
          <LoaderIcon
            color={hovered ? "white" : disabled ? "grey" : color}
            size="small"
          />
        )}
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};

export default QuivrButton;
