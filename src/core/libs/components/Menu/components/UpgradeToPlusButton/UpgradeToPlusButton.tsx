import { useTranslations } from "next-intl";

import { MenuButton } from "~/core/libs/components/Menu/components/MenuButton/MenuButton";
import { StripePricingModal } from "~/core/libs/components/Stripe";
import { useUserData } from "~/core/libs/hooks/useUserData";

export const UpgradeToPlusButton = (): JSX.Element => {
  const { userData } = useUserData();
  const is_premium = userData?.is_premium;
  const t = useTranslations("monetization");

  if (is_premium === true) {
    return <></>;
  }

  return (
    <StripePricingModal
      Trigger={
        <MenuButton
          iconName="star"
          label={t("upgrade")}
          type="add"
          color="gold"
        />
      }
    />
  );
};
