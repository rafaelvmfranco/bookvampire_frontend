import { useState } from "react";
import { useTranslations } from "next-intl";

import { useChatApi } from "~/core/libs/api/chat/useChatApi";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useToast } from "~/core/libs/hooks";
import { useUrlBrain } from "~/core/libs/hooks/useBrainIdFromUrl";

import { useFeedBrainHandler } from "./useFeedBrainHandler";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFeedBrain = ({
  dispatchHasPendingRequests,
  closeFeedInput,
}: {
  dispatchHasPendingRequests?: () => void;
  closeFeedInput?: () => void;
}) => {
  const { publish } = useToast();
  const t = useTranslations("upload");
  let { brainId } = useUrlBrain();
  const { currentBrainId } = useBrainContext();
  const { setKnowledgeToFeed, knowledgeToFeed, setShouldDisplayFeedCard } =
    useKnowledgeToFeedContext();
  const [hasPendingRequests, setHasPendingRequests] = useState(false);
  const { handleFeedBrain } = useFeedBrainHandler();

  const { createChat, deleteChat } = useChatApi();

  const feedBrain = async (): Promise<void> => {
    brainId ??= currentBrainId ?? undefined;
    if (brainId === undefined) {
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

    //TODO: Modify backend archi to avoid creating a chat for each feed action
    const currentChatId = (await createChat("New Chat")).chat_id;

    try {
      dispatchHasPendingRequests?.();
      closeFeedInput?.();
      setHasPendingRequests(true);
      setShouldDisplayFeedCard(false);
      await handleFeedBrain({
        brainId,
        chatId: currentChatId,
      });

      setKnowledgeToFeed([]);
    } catch (e) {
      publish({
        variant: "danger",
        text: JSON.stringify(e),
      });
    } finally {
      setHasPendingRequests(false);
      await deleteChat(currentChatId);
    }
  };

  return {
    feedBrain,
    hasPendingRequests,
    setHasPendingRequests,
  };
};
