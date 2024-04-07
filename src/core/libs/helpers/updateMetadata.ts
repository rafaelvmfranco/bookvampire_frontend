/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export const UpdateMetadata = () => {
  const t = useTranslations("translation");

  useEffect(() => {
    const title = t("title");
    const description = t("description");
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription instanceof HTMLMetaElement) {
      metaDescription.content = description;
    }
  }, [t]);

  return null;
};
