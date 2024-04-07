import type { UUID } from "node:crypto";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

import { useCrawlApi } from "~/core/libs/api/crawl/useCrawlApi";
import { useUploadApi } from "~/core/libs/api/upload/useUploadApi";
import { getAxiosErrorParams } from "~/core/libs/helpers/getAxiosErrorParams";
import { useToast } from "~/core/libs/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useKnowledgeToFeedInput = () => {
  const { publish } = useToast();
  const { uploadFile } = useUploadApi();
  const t = useTranslations("upload");
  const { crawlWebsiteUrl } = useCrawlApi();

  const crawlWebsiteHandler = useCallback(
    async (url: string, brainId: UUID, chat_id?: UUID) => {
      // Configure parameters
      const config = {
        url: url,
        js: false,
        depth: 1,
        max_pages: 100,
        max_time: 60,
      };

      try {
        await crawlWebsiteUrl({
          brainId,
          config,
          chat_id,
        });
      } catch (error: unknown) {
        const errorParams = getAxiosErrorParams(error);
        if (errorParams !== undefined) {
          publish({
            variant: "danger",
            text: t("crawlFailed", {
              message: JSON.stringify(errorParams.message),
            }),
          });
        } else {
          publish({
            variant: "danger",
            text: t("crawlFailed", {
              message: JSON.stringify(error),
            }),
          });
        }
      }
    },
    [crawlWebsiteUrl, publish, t],
  );

  const uploadFileHandler = useCallback(
    async (file: File, brainId: UUID, chat_id?: UUID) => {
      const formData = new FormData();
      formData.append("uploadFile", file);
      try {
        await uploadFile({
          brainId,
          formData,
          chat_id,
        });
      } catch (e: unknown) {
        const errorParams = getAxiosErrorParams(e);
        if (errorParams !== undefined) {
          publish({
            variant: "danger",
            text: t("uploadFailed", {
              message: JSON.stringify(errorParams.message),
            }),
          });
        } else {
          publish({
            variant: "danger",
            text: t("uploadFailed", {
              message: JSON.stringify(e),
            }),
          });
        }
      }
    },
    [publish, t, uploadFile],
  );

  return {
    crawlWebsiteHandler,
    uploadFileHandler,
  };
};
