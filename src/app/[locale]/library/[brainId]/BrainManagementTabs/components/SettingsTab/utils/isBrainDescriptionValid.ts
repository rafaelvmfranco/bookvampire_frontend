import { useTranslations } from "next-intl";

import type { ToastData } from "~/islands/ui/Toast/domain/types";

export const isBrainDescriptionValid = (
  description: string,
  publish: (toast: ToastData) => void,
): boolean => {
  const t = useTranslations("config");
  const trimmedDescription = description.trim();

  if (trimmedDescription === "") {
    publish({
      variant: "danger",
      text: t("descriptionRequired"),
    });
    return false;
  }

  return true;
};
