import type { UUID } from "node:crypto";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { PUBLIC_BRAINS_KEY } from "~/core/libs/api/brain/config";
import type { IntegrationSettings } from "~/core/libs/api/brain/types";
import type { CreateBrainProps } from "~/core/libs/components/AddBrainModal/types/types";
import { useKnowledgeToFeedInput } from "~/core/libs/components/KnowledgeToFeedInput/hooks/useKnowledgeToFeedInput.ts";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useToast } from "~/core/libs/hooks";
import { useKnowledgeToFeedFilesAndUrls } from "~/core/libs/hooks/useKnowledgeToFeed";

import { useBrainCreationContext } from "../../../brainCreation-provider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainCreationApi = () => {
  const queryClient = useQueryClient();
  const { publish } = useToast();
  const t = useTranslations("brain");
  const { files, urls } = useKnowledgeToFeedFilesAndUrls();
  const { getValues, reset } = useFormContext<CreateBrainProps>();
  const { setKnowledgeToFeed } = useKnowledgeToFeedContext();
  const { createBrain: createBrainApi, setCurrentBrainId } = useBrainContext();
  const { crawlWebsiteHandler, uploadFileHandler } = useKnowledgeToFeedInput();
  const { setIsBrainCreationModalOpened, setCreating, currentSelectedBrain } =
    useBrainCreationContext();
  const [fields, setFields] = useState<
    { name: string; type: string; value: string }[]
  >([]);

  const handleFeedBrain = async (brainId: UUID): Promise<void> => {
    const uploadPromises = files.map((file) =>
      uploadFileHandler(file, brainId),
    );
    const crawlPromises = urls.map((url) => crawlWebsiteHandler(url, brainId));

    await Promise.all([...uploadPromises, ...crawlPromises]);
    setKnowledgeToFeed([]);
  };

  const createBrain = async (): Promise<void> => {
    const { name, description } = getValues();
    let integrationSettings: IntegrationSettings | undefined = undefined;

    if (currentSelectedBrain) {
      integrationSettings = {
        integration_id: currentSelectedBrain.id,
        settings: fields.reduce(
          (acc, field) => {
            acc[field.name] = field.value;

            return acc;
          },
          {} as { [key: string]: string },
        ),
      };
    }

    const createdBrainId = await createBrainApi({
      brain_type: currentSelectedBrain ? "integration" : "doc",
      name,
      description,
      integration: integrationSettings,
    });

    if (createdBrainId === undefined) {
      publish({
        variant: "danger",
        text: t("errorCreatingBrain", { ns: "brain" }),
      });

      return;
    }

    void handleFeedBrain(createdBrainId);

    setCurrentBrainId(createdBrainId);
    setIsBrainCreationModalOpened(false);
    setCreating(false);
    reset();

    void queryClient.invalidateQueries({
      queryKey: [PUBLIC_BRAINS_KEY],
    });
  };

  const { mutate, isPending: isBrainCreationPending } = useMutation({
    mutationFn: createBrain,
    onSuccess: () => {
      publish({
        variant: "success",
        text: t("brainCreated", { ns: "brain" }),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 429) {
        publish({
          variant: "danger",
          text: "You have reached your maximum amount of brains. Upgrade your plan to create more.",
        });
      } else {
        publish({
          variant: "danger",
          text: t("errorCreatingBrain", { ns: "brain" }),
        });
      }
    },
  });

  return {
    createBrain: mutate,
    isBrainCreationPending,
    fields,
    setFields,
  };
};
