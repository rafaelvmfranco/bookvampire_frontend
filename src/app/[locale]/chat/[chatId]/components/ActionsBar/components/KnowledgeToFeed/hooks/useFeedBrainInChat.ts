/*eslint max-lines: ["error", 200 ]*/

import type { UUID } from "node:crypto";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { CHATS_DATA_KEY } from "~/core/libs/api/chat/config";
import { useChatApi } from "~/core/libs/api/chat/useChatApi";
import { useNotificationApi } from "~/core/libs/api/notification/useNotificationApi";
import { useKnowledgeToFeedInput } from "~/core/libs/components/KnowledgeToFeedInput/hooks/useKnowledgeToFeedInput.ts";
import { useChatContext } from "~/core/libs/context";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useToast } from "~/core/libs/hooks";
import { useOnboarding } from "~/core/libs/hooks/useOnboarding";

import type { FeedItemCrawlType, FeedItemUploadType } from "../../../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFeedBrainInChat = ({
  dispatchHasPendingRequests,
}: {
  dispatchHasPendingRequests: () => void;
}) => {
  const { publish } = useToast();
  const queryClient = useQueryClient();
  const t = useTranslations("upload");
  const router = useRouter();
  const { updateOnboarding, onboarding } = useOnboarding();
  const { setShouldDisplayFeedCard } = useKnowledgeToFeedContext();
  const { currentBrainId } = useBrainContext();
  const { setKnowledgeToFeed, knowledgeToFeed } = useKnowledgeToFeedContext();
  const [hasPendingRequests, setHasPendingRequests] = useState(false);
  const { createChat } = useChatApi();
  const params = useParams();
  const chatId = params?.chatId as UUID | undefined;
  const { setNotifications } = useChatContext();
  const { getChatNotifications } = useNotificationApi();
  const fetchNotifications = async (currentChatId: UUID): Promise<void> => {
    const fetchedNotifications = await getChatNotifications(currentChatId);
    setNotifications(fetchedNotifications);
  };
  const { crawlWebsiteHandler, uploadFileHandler } = useKnowledgeToFeedInput();
  const files: File[] = (
    knowledgeToFeed.filter((c) => c.source === "upload") as FeedItemUploadType[]
  ).map((c) => c.file);
  const urls: string[] = (
    knowledgeToFeed.filter((c) => c.source === "crawl") as FeedItemCrawlType[]
  ).map((c) => c.url);
  const feedBrain = async (): Promise<void> => {
    if (currentBrainId === null) {
      publish({
        variant: "danger",
        text: t("selectBrainFirst"),
      });

      return;
    }
    if (knowledgeToFeed.length === 0) {
      publish({
        variant: "danger",
        text: t("addFiles"),
      });

      return;
    }
    try {
      dispatchHasPendingRequests();
      setShouldDisplayFeedCard(false);
      setHasPendingRequests(true);
      const currentChatId = chatId ?? (await createChat("New Chat")).chat_id;
      const uploadPromises = files.map((file) =>
        uploadFileHandler(file, currentBrainId, currentChatId),
      );
      const crawlPromises = urls.map((url) =>
        crawlWebsiteHandler(url, currentBrainId, currentChatId),
      );

      const updateOnboardingPromise = async () => {
        if (onboarding.onboarding_a) {
          await updateOnboarding({
            onboarding_a: false,
          });
        }
      };

      await Promise.all([
        ...uploadPromises,
        ...crawlPromises,
        updateOnboardingPromise(),
      ]);

      setKnowledgeToFeed([]);

      if (chatId === undefined) {
        void queryClient.invalidateQueries({
          queryKey: [CHATS_DATA_KEY],
        });
        void router.push(`/chat/${currentChatId}`);
      } else {
        await fetchNotifications(currentChatId);
      }
    } catch (e) {
      publish({
        variant: "danger",
        text: JSON.stringify(e),
      });
    } finally {
      setHasPendingRequests(false);
    }
  };

  return {
    feedBrain,
    hasPendingRequests,
  };
};
