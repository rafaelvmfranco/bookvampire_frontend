/* eslint-disable max-lines */

import type { UUID } from "node:crypto";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import { useBrainFetcher } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/hooks/useBrainFetcher";
import type { CreateBrainInput } from "~/core/libs/api/brain/types";
import { useBrainApi } from "~/core/libs/api/brain/useBrainApi";
import { usePromptApi } from "~/core/libs/api/prompt/usePromptApi";
import { useToast } from "~/core/libs/hooks";
import type { Prompt } from "~/core/libs/types/Prompt";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

import type { MinimalBrainForUser } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainProvider = () => {
  const { publish } = useToast();
  const { track } = useEventTracking();
  const { createBrain, deleteBrain, getBrains, getDefaultBrain } =
    useBrainApi();
  const { getPublicPrompts } = usePromptApi();
  const t = useTranslations("deleteOrUnsubscribeFromBrain");

  const [allBrains, setAllBrains] = useState<MinimalBrainForUser[]>([]);
  const [currentBrainId, setCurrentBrainId] = useState<null | UUID>(null);
  const [defaultBrainId, setDefaultBrainId] = useState<UUID>();
  const [isFetchingBrains, setIsFetchingBrains] = useState(true);
  const [publicPrompts, setPublicPrompts] = useState<Prompt[]>([]);
  const [currentPromptId, setCurrentPromptId] = useState<null | string>(null);

  const currentPrompt = publicPrompts.find(
    (prompt) => prompt.id === currentPromptId,
  );
  const currentBrain = allBrains.find((brain) => brain.id === currentBrainId);
  const { brain: currentBrainDetails } = useBrainFetcher({
    brainId: currentBrainId ?? undefined,
  });

  const fetchAllBrains = useCallback(async () => {
    setIsFetchingBrains(true);
    try {
      const brains = await getBrains();
      setAllBrains(brains);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingBrains(false);
    }
  }, [getBrains]);

  const createBrainHandler = useCallback(
    async (brain: CreateBrainInput): Promise<UUID | undefined> => {
      const createdBrain = await createBrain(brain);
      try {
        setCurrentBrainId(createdBrain.id);

        void track("BRAIN_CREATED", {
          brainType: brain.brain_type,
        });

        void fetchAllBrains();

        return createdBrain.id;
      } catch {
        publish({
          variant: "danger",
          text: "Error occurred while creating a brain",
        });
      }
    },
    [createBrain, fetchAllBrains, publish, track],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const deleteBrainHandler = useCallback(
    async (id: UUID) => {
      await deleteBrain(id);
      setAllBrains((prevBrains) =>
        prevBrains.filter((brain) => brain.id !== id),
      );
      void track("DELETE_BRAIN");
      publish({
        variant: "success",
        text: t("successfully_deleted"),
      });
    },
    [deleteBrain, publish, track],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const fetchDefaultBrain = useCallback(async () => {
    const userDefaultBrain = await getDefaultBrain();
    if (userDefaultBrain !== undefined) {
      setDefaultBrainId(userDefaultBrain.id);
    }
  }, [currentBrainId, getDefaultBrain]);

  const fetchPublicPrompts = useCallback(async () => {
    setPublicPrompts(await getPublicPrompts());
  }, [getPublicPrompts]);

  return {
    allBrains,
    fetchAllBrains,
    isFetchingBrains,

    currentBrain,
    currentBrainDetails,
    currentBrainId,
    setCurrentBrainId,

    defaultBrainId,
    fetchDefaultBrain,

    fetchPublicPrompts,
    publicPrompts,
    currentPrompt,

    setCurrentPromptId,
    currentPromptId,

    createBrain: createBrainHandler,

    deleteBrain: deleteBrainHandler,
  };
};
