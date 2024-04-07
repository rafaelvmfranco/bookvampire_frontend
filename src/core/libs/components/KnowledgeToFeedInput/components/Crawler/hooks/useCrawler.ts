"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useToast } from "~/core/libs/hooks";
import { useOnboarding } from "~/core/libs/hooks/useOnboarding";
import { useOnboardingTracker } from "~/core/libs/hooks/useOnboardingTracker";
import { redirectToLogin } from "~/core/libs/router/redirectToLogin";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

import { isValidUrl } from "../helpers/isValidUrl";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCrawler = () => {
  const { addKnowledgeToFeed } = useKnowledgeToFeedContext();
  const urlInputRef = useRef<HTMLInputElement | null>(null);
  const { session } = useSupabase();
  const { publish } = useToast();
  const t = useTranslations("upload");
  const [urlToCrawl, setUrlToCrawl] = useState<string>("");
  const { track } = useEventTracking();
  const { trackOnboardingEvent } = useOnboardingTracker();
  const { isOnboarding } = useOnboarding();

  if (session === null) {
    redirectToLogin();
  }

  const handleSubmit = () => {
    if (urlToCrawl === "") {
      return;
    }
    if (!isValidUrl(urlToCrawl)) {
      void track("URL_INVALID");
      publish({
        variant: "danger",
        text: t("invalidUrl"),
      });

      return;
    }
    if (isOnboarding) {
      void trackOnboardingEvent("URL_CRAWLED");
    } else {
      void track("URL_CRAWLED");
    }
    addKnowledgeToFeed({
      source: "crawl",
      url: urlToCrawl,
    });
    setUrlToCrawl("");
  };

  return {
    urlInputRef,
    urlToCrawl,
    setUrlToCrawl,
    handleSubmit,
  };
};
