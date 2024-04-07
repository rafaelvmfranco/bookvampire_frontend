import type { UUID } from "node:crypto";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBrainDataKey } from "~/core/libs/api/brain/config";
import { useBrainApi } from "~/core/libs/api/brain/useBrainApi";

type UseBrainFetcherProps = {
  brainId?: UUID;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainFetcher = ({ brainId }: UseBrainFetcherProps) => {
  const { getBrain } = useBrainApi();
  const queryClient = useQueryClient();
  const router = useRouter();

  const fetchBrain = async () => {
    try {
      if (brainId === undefined) {
        return undefined;
      }

      return await getBrain(brainId);
    } catch (error) {
      router.push("/library");
    }
  };

  const { data: brain, isLoading } = useQuery({
    queryKey: [getBrainDataKey(brainId!)],
    queryFn: fetchBrain,
    enabled: brainId !== undefined,
  });

  const invalidateBrainQuery = () => {
    void queryClient.invalidateQueries({
      queryKey: [getBrainDataKey(brainId!)],
    });
  };

  return {
    brain,
    refetchBrain: invalidateBrainQuery,
    isLoading,
  };
};
