import Tooltip from "~/islands/ui/Tooltip/Tooltip";

import { Icon } from "../Icon/Icon";
import styles from "./FieldHeader.module.scss";

type FieldHeaderProps = {
  iconName: string;
  label: string;
  help?: string;
  mandatory?: boolean;
};

export const FieldHeader = ({
  iconName,
  label,
  help,
  mandatory,
}: FieldHeaderProps): JSX.Element => {
  return (
    <div className={styles.field_header_wrapper}>
      <Icon name={iconName} color="black" size="small" />
      <label>{label}</label>
      {mandatory && <span className={styles.mandatory}>*</span>}
      <span className={styles.mandatory}>{help && "*"}</span>
      {help && (
        <Tooltip tooltip={help}>
          <div>
            <Icon name="help" size="normal" color="black" handleHover={true} />
          </div>
        </Tooltip>
      )}
    </div>
  );
};
