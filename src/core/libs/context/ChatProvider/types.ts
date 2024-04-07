import type {
  ChatMessage,
  Notification,
} from "~/app/[locale]/chat/[chatId]/types";

import type { Model } from "../../types/BrainConfig";

export type ChatConfig = {
  model: Model;
  temperature: number;
  maxTokens: number;
};

export type ChatContextProps = {
  messages: ChatMessage[];
  setMessages: (history: ChatMessage[]) => void;
  updateStreamingHistory: (streamedChat: ChatMessage) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  removeMessage: (id: string) => void;
  sourcesMessageIndex: number | undefined;
  setSourcesMessageIndex: (index: number | undefined) => void;
};
