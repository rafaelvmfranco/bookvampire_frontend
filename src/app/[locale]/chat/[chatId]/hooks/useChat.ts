/* eslint-disable max-lines */

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";

import { CHATS_DATA_KEY } from "~/core/libs/api/chat/config";
import { useChatApi } from "~/core/libs/api/chat/useChatApi";
import { useChatContext } from "~/core/libs/context";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useSearchModalContext } from "~/core/libs/context/SearchModalProvider/hooks/useSearchModalContext";
import { getChatNameFromQuestion } from "~/core/libs/helpers/getChatNameFromQuestion";
import { useToast } from "~/core/libs/hooks";
import { useOnboarding } from "~/core/libs/hooks/useOnboarding";
import { useOnboardingTracker } from "~/core/libs/hooks/useOnboardingTracker";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

import type { ChatQuestion } from "../types";
import { useLocalStorageChatConfig } from "./useLocalStorageChatConfig";
import { useQuestion } from "./useQuestion";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChat = () => {
  const { track } = useEventTracking();
  const queryClient = useQueryClient();

  const params = useParams();
  const [chatId, setChatId] = useState<string | undefined>(
    params?.chatId as string | undefined,
  );
  const { isOnboarding } = useOnboarding();
  const { trackOnboardingEvent } = useOnboardingTracker();
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const router = useRouter();
  const { messages } = useChatContext();
  const { currentBrain, currentPromptId, currentBrainId } = useBrainContext();
  const { publish } = useToast();
  const { createChat } = useChatApi();
  const {
    chatConfig: { model, maxTokens, temperature },
  } = useLocalStorageChatConfig();
  const { isVisible } = useSearchModalContext();

  const { addStreamQuestion } = useQuestion();
  const t = useTranslations("chat");

  const addQuestion = async (question: string, callback?: () => void) => {
    if (question === "") {
      publish({
        variant: "danger",
        text: t("ask"),
      });

      return;
    }

    try {
      setGeneratingAnswer(true);

      let currentChatId = chatId;

      //if chatId is not set, create a new chat. Chat name is from the first question
      if (currentChatId === undefined || isVisible) {
        const chat = await createChat(getChatNameFromQuestion(question));
        currentChatId = chat.chat_id;
        setChatId(currentChatId);
        router.push(`/chat/${currentChatId}`);
        void queryClient.invalidateQueries({
          queryKey: [CHATS_DATA_KEY],
        });
      }

      if (isOnboarding) {
        void trackOnboardingEvent("QUESTION_ASKED", {
          brainId: currentBrainId,
          promptId: currentPromptId,
        });
      } else {
        void track("QUESTION_ASKED", {
          brainId: currentBrainId,
          promptId: currentPromptId,
        });
      }

      const chatQuestion: ChatQuestion = {
        model, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        question,
        temperature: temperature,
        max_tokens: maxTokens,
        brain_id: currentBrain?.id,
        prompt_id: currentPromptId ?? undefined,
      };

      callback?.();
      await addStreamQuestion(currentChatId, chatQuestion);
    } catch (error) {
      console.error({ error });

      if ((error as AxiosError).response?.status === 429) {
        publish({
          variant: "danger",
          text: t("limit_reached", { ns: "chat" }),
        });

        return;
      }

      publish({
        variant: "danger",
        text: t("error_occurred", { ns: "chat" }),
      });
    } finally {
      setGeneratingAnswer(false);
    }
  };

  return {
    messages,
    addQuestion,
    generatingAnswer,
    chatId,
  };
};
