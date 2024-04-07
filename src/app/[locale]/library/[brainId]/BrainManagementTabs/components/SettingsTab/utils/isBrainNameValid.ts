// todo: ensure this file is converted correctly from i18next to next-intl

import { useTranslations } from "next-intl";

import type { ToastData } from "~/islands/ui/Toast/domain/types";

export const isBrainNameValid = (
  name: string,
  publish: (toast: ToastData) => void,
): boolean => {
  const t = useTranslations("config");
  const trimmedName = name.trim();

  if (trimmedName === "") {
    publish({
      variant: "danger",
      text: t("nameRequired"),
    });
    return false;
  }

  return true;
};
