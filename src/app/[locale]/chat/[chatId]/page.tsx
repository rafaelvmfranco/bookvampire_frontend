"use client";

import type { UUID } from "node:crypto";
import { useEffect } from "react";
import Image from "next/image";
import { AddBrainModal } from "~/core/libs/components/AddBrainModal";
import { useBrainCreationContext } from "~/core/libs/components/AddBrainModal/brainCreation-provider";
import { UploadDocumentModal } from "~/core/libs/components/UploadDocumentModal/UploadDocumentModal";
import { useChatContext } from "~/core/libs/context";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useDevice } from "~/core/libs/hooks/useDevice";
import { useCustomDropzone } from "~/core/libs/hooks/useDropzone";
import type { ButtonType } from "~/core/libs/types/QuivrButton";
import { cn } from "~/core/libs/utils";

import { ActionsBar } from "./components/ActionsBar";
import { ChatDialogueArea } from "./components/ChatDialogueArea/ChatDialogue";
import Sources from "./components/Sources/Sources";
import { useChatNotificationsSync } from "./hooks/useChatNotificationsSync";
import { DEBUG_GOD_MODE } from "~/app";
import BookVampireLogo from "~/core/assets/logo.png";
import { UserCircle } from "lucide-react";

const SelectedChatPage = (): JSX.Element => {
  const { getRootProps } = useCustomDropzone();
  const { isMobile } = useDevice();
  const { setShouldDisplayFeedCard, shouldDisplayFeedCard } =
    useKnowledgeToFeedContext();
  const { setIsBrainCreationModalOpened } = useBrainCreationContext();
  const { currentBrain, setCurrentBrainId } = useBrainContext();
  const { messages } = useChatContext();
  const { sourcesMessageIndex, setSourcesMessageIndex } = useChatContext();
  useChatNotificationsSync();

  const buttons: ButtonType[] = [
    {
      label: "Create book",
      color: "primary",
      onClick: () => {
        setIsBrainCreationModalOpened(true);
      },
      iconName: "brain",
    },
    {
      label: "Add knowledge",
      color: "primary",
      onClick: () => {
        setShouldDisplayFeedCard(true);
      },
      iconName: "uploadFile",
      hidden: !currentBrain?.max_files,
    },
    {
      label: "Manage current brain",
      color: "primary",
      onClick: () => {
        window.location.href = `/library/${currentBrain?.id}`;
      },
      iconName: "edit",
    },
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!currentBrain && messages.length > 0) {
      setCurrentBrainId(messages[messages.length - 1].brain_id as UUID);
    }
  }, [messages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return () => {
      setSourcesMessageIndex(undefined);
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div
        className={cn(
          "flex flex-1 bg-background-0 px-6 py-6 gap-9 overflow-hidden",
        )}
        {...(shouldDisplayFeedCard ? {} : getRootProps())}
      >
        <div className="flex h-full w-full justify-stretch max-w-4xl flex-1 flex-col overflow-hidden dark:shadow-primary/25">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <ChatDialogueArea />
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center justify-end px-4 py-2">
                <div className="flex items-center font-semibold">
                  <UserCircle className="max-w-6 mr-2 text-black/90 dark:text-white/80" />
                  <span className="text-sm text-black/90 dark:text-white/80">
                    User name
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-4">
                <div className="bg-slate-100 dark:bg-gray-700 p-4 rounded-lg mb-4 flex max-w-xl ml-auto">
                  <h2 className="font-semibold mb-2">
                    Provide a summary of the book
                  </h2>
                </div>
                <div className="flex items-center mt-4 mb-4">
                  <Image
                    src={BookVampireLogo}
                    alt="Book Vampire Logo"
                    height="32"
                    width="32"
                    className="rounded-full mr-2"
                  />
                  <span className="font-semibold text-black/90 dark:text-white/80">
                    Book name
                  </span>
                  <span className="font-semibold text-primary ml-4 mr-2">
                    #
                  </span>
                  <span className="font-semibold text-black/90 dark:text-white/80">
                    Thread name
                  </span>
                </div>
                <div className="bg-muted dark:bg-[#24000A] p-4 rounded-lg">
                  <p>
                    The main idea of "The Power of Now" revolves around the
                    concept of living in the present moment. Eckhart Tolle
                    argues that the key to spiritual awakening and true
                    happiness lies in freeing oneself from the incessant chatter
                    of the mind.
                  </p>
                  <p className="mt-2">
                    It prevents individuals from fully experiencing the richness
                    of life in the present moment. By learning to quiet the mind
                    and disidentify from negative thoughts.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <ActionsBar />
          </div>
        </div>

        {!isMobile && sourcesMessageIndex !== undefined && (
          <div className="h-full w-0 animate-expand">
            <Sources />
          </div>
        )}
      </div>

      <UploadDocumentModal />
      <AddBrainModal />
    </div>
  );
};

export default SelectedChatPage;
