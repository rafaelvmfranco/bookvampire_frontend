import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";

import type { SuggestionItem } from "../types";
import { useMentionConfig } from "./useMentionConfig";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainMention = () => {
  const { allBrains } = useBrainContext();

  const items: SuggestionItem[] = allBrains.map((brain) => ({
    id: brain.id,
    label: brain.name,
    type: "brain",
    iconUrl: brain.integration_logo_url,
  }));

  const { Mention: BrainMention } = useMentionConfig({
    char: "@",
    suggestionData: {
      type: "brain",
      items,
    },
  });

  return {
    BrainMention,
    items,
  };
};
