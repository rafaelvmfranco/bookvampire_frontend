import React, { useEffect, useState } from "react";

import { useChat } from "~/app/[locale]/chat/[chatId]/hooks/useChat";
import { useChatApi } from "~/core/libs/api/chat/useChatApi";
import { useChatContext } from "~/core/libs/context";
import { useDevice } from "~/core/libs/hooks/useDevice";
import type { Source } from "~/core/libs/types/MessageMetadata";
import { CopyButton } from "~/islands/ui/CopyButton";
import Icon from "~/islands/ui/Icon/Icon";

import { MessageContent } from "./components/MessageContent/MessageContent";
import { QuestionBrain } from "./components/QuestionBrain/QuestionBrain";
import { QuestionPrompt } from "./components/QuestionPrompt/QuestionPrompt";
import { useMessageRow } from "./hooks/useMessageRow";
import styles from "./MessageRow.module.scss";

type MessageRowProps = {
  speaker: "user" | "assistant";
  text?: string;
  brainName?: string | null;
  promptName?: string | null;
  children?: React.ReactNode;
  metadata?: {
    sources?: Source[];
  };
  brainId?: string;
  index?: number;
  messageId?: string;
  thumbs?: boolean;
  lastMessage?: boolean;
};

export const MessageRow = React.forwardRef(
  (
    {
      speaker,
      text,
      brainName,
      promptName,
      children,
      brainId,
      index,
      messageId,
      thumbs: initialThumbs,
      lastMessage,
    }: MessageRowProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { handleCopy, isUserSpeaker } = useMessageRow({
      speaker,
      text,
    });
    const { setSourcesMessageIndex, sourcesMessageIndex } = useChatContext();
    const { isMobile } = useDevice();
    const { updateChatMessage } = useChatApi();
    const { chatId } = useChat();
    const [thumbs, setThumbs] = useState<boolean | undefined | null>(
      initialThumbs,
    );

    useEffect(() => {
      setThumbs(initialThumbs);
    }, [initialThumbs]);

    const messageContent = text ?? "";

    const thumbsUp = async () => {
      if (chatId && messageId) {
        await updateChatMessage(chatId, messageId, {
          thumbs: thumbs ? null : true,
        });
        setThumbs(thumbs ? null : true);
      }
    };

    const thumbsDown = async () => {
      if (chatId && messageId) {
        await updateChatMessage(chatId, messageId, {
          thumbs: thumbs === false ? null : false,
        });
        setThumbs(thumbs === false ? null : false);
      }
    };

    const renderMessageHeader = () => {
      if (!isUserSpeaker) {
        return (
          <div className={styles.message_header}>
            <QuestionBrain brainName={brainName} brainId={brainId} />
            <QuestionPrompt promptName={promptName} />
          </div>
        );
      } else {
        return (
          <div className={styles.message_header}>
            <Icon name="user" color="dark-grey" size="normal" />
            <span className={styles.me}>Me</span>
          </div>
        );
      }
    };

    const renderIcons = () => {
      if (!isUserSpeaker && messageContent !== "🧠") {
        return (
          <div
            className={`${styles.icons_wrapper} ${
              lastMessage ? styles.sticky : ""
            }`}
          >
            <CopyButton handleCopy={handleCopy} size="normal" />
            {!isMobile && (
              <div className={styles.sources_icon_wrapper}>
                <Icon
                  name="file"
                  handleHover={true}
                  color={sourcesMessageIndex === index ? "primary" : "black"}
                  size="normal"
                  onClick={() => {
                    setSourcesMessageIndex(
                      sourcesMessageIndex === index ? undefined : index,
                    );
                  }}
                />
              </div>
            )}
            <Icon
              name="thumbsUp"
              handleHover={true}
              color={thumbs ? "primary" : "black"}
              size="normal"
              onClick={async () => {
                await thumbsUp();
              }}
            />
            <Icon
              name="thumbsDown"
              handleHover={true}
              color={thumbs === false ? "primary" : "black"}
              size="normal"
              onClick={async () => {
                await thumbsDown();
              }}
            />
          </div>
        );
      }
    };

    return (
      <div
        className={`
      ${styles.message_row_container} 
      ${isUserSpeaker ? styles.user : styles.brain}
      `}
      >
        {renderMessageHeader()}
        <div ref={ref} className={styles.message_row_content}>
          {children ?? (
            <>
              <MessageContent text={messageContent} isUser={isUserSpeaker} />
              {renderIcons()}
            </>
          )}
        </div>
      </div>
    );
  },
);

MessageRow.displayName = "MessageRow";
