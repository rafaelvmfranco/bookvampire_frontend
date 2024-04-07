import type { UUID } from "node:crypto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getKnowledgeDataKey } from "~/core/libs/api/knowledge/config";
import { useKnowledgeApi } from "~/core/libs/api/knowledge/useKnowledgeApi";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAddedKnowledge = ({ brainId }: { brainId?: UUID }) => {
  const queryClient = useQueryClient();

  const { getAllKnowledge } = useKnowledgeApi();

  const fetchKnowledge = () => {
    if (brainId !== undefined) {
      return getAllKnowledge({ brainId });
    }
  };

  const { data: allKnowledge, isLoading: isPending } = useQuery({
    queryKey: brainId !== undefined ? [getKnowledgeDataKey(brainId)] : [],
    queryFn: fetchKnowledge,
    enabled: brainId !== undefined,
  });

  if (brainId === undefined) {
    return {
      invalidateKnowledgeDataKey: () => void {},
      isPending: false,
      allKnowledge: [],
    };
  }

  const knowledge_data_key = getKnowledgeDataKey(brainId);

  const invalidateKnowledgeDataKey = () => {
    void queryClient.invalidateQueries({ queryKey: [knowledge_data_key] });
  };

  return {
    invalidateKnowledgeDataKey,
    isPending,
    allKnowledge: allKnowledge ?? [],
  };
};
