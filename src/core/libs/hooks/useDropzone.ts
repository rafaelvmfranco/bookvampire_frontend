import { useTranslations } from "next-intl";
import { useDropzone, type FileRejection } from "react-dropzone";

import type { FeedItemUploadType } from "~/app/[locale]/chat/[chatId]/components/ActionsBar/types";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

import { useBrainCreationContext } from "../components/AddBrainModal/brainCreation-provider";
import { useKnowledgeToFeedContext } from "../context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { acceptedFormats } from "../helpers/acceptedFormats";
import { cloneFileWithSanitizedName } from "../helpers/cloneFileWithSanitizedName";
import { useOnboarding } from "./useOnboarding";
import { useOnboardingTracker } from "./useOnboardingTracker";
import { useToast } from "./useToast";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCustomDropzone = () => {
  const { knowledgeToFeed, addKnowledgeToFeed, setShouldDisplayFeedCard } =
    useKnowledgeToFeedContext();
  const { isBrainCreationModalOpened } = useBrainCreationContext();
  const { isOnboarding } = useOnboarding();
  const { trackOnboardingEvent } = useOnboardingTracker();
  const files: File[] = (
    knowledgeToFeed.filter((c) => c.source === "upload") as FeedItemUploadType[]
  ).map((c) => c.file);

  const { publish } = useToast();
  const { track } = useEventTracking();

  const t = useTranslations("upload");

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (!isBrainCreationModalOpened) {
      setShouldDisplayFeedCard(true);
    }
    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0];

      if (firstRejection.errors[0].code === "file-invalid-type") {
        publish({ variant: "danger", text: t("invalidFileType") });
      } else {
        publish({
          variant: "danger",
          text: t("maxSizeError", { ns: "upload" }),
        });
      }

      return;
    }

    for (const file of acceptedFiles) {
      const isAlreadyInFiles =
        files.filter((f) => f.name === file.name && f.size === file.size)
          .length > 0;
      if (isAlreadyInFiles) {
        publish({
          variant: "warning",
          text: t("alreadyAdded", { fileName: file.name, ns: "upload" }),
        });
      } else {
        if (isOnboarding) {
          void trackOnboardingEvent("FILE_UPLOADED");
        } else {
          void track("FILE_UPLOADED");
        }

        addKnowledgeToFeed({
          source: "upload",
          file: cloneFileWithSanitizedName(file),
        });
      }
    }
  };

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    maxSize: 100000000, // 1 MB
    accept: acceptedFormats,
  });

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    open,
  };
};
