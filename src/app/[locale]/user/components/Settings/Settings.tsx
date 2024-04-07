import { InfoDisplayer } from "~/islands/ui/InfoDisplayer/InfoDisplayer";

import { ApiKeyConfig } from "../ApiKeyConfig";
import { StripePricingOrManageButton } from "../StripePricingOrManageButton";
import styles from "./Settings.module.scss";

type InfoDisplayerProps = {
  email: string;
};

export const Settings = ({ email }: InfoDisplayerProps): JSX.Element => {
  return (
    <div className={styles.settings_wrapper}>
      <InfoDisplayer label="Email" iconName="email">
        <span>{email}</span>
      </InfoDisplayer>
      <ApiKeyConfig />
      <StripePricingOrManageButton />
    </div>
  );
};
